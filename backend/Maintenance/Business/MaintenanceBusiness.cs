using Maintenance.Models;
using Maintenance.Repository;
using Microsoft.AspNetCore.Http;
using System.Text.Json;

namespace Maintenance.Business
{
    public class MaintenanceBusiness
    {
        private readonly MaintenanceRepository _repository;
        private readonly HttpClient _httpClient;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public MaintenanceBusiness(MaintenanceRepository repository, IHttpClientFactory httpClientFactory, IHttpContextAccessor httpContextAccessor)
        {
            _repository = repository;
            _httpClient = httpClientFactory.CreateClient();
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<List<Models.Maintenance>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Models.Maintenance> GetByIdAsync(int id)
        {
            var maintenance = await _repository.GetByIdAsync(id);
            if (maintenance == null)
                throw new Exception($"Maintenance with ID {id} not found.");
            return maintenance;
        }

        public async Task AddAsync(Models.Maintenance maintenance)
        {
            maintenance.LastUpdate = DateTime.UtcNow;

            if (maintenance.MaintenanceParts != null)
            {
                foreach (var part in maintenance.MaintenanceParts)
                {
                    part.Maintenance = maintenance;

                    // Verifique se o PartId está configurado corretamente
                    if (part.PartId <= 0)
                    {
                        throw new Exception("PartId is missing or invalid.");
                    }

                    await NotifyToolApi(part.PartId, part.Quantity);
                }
            }

            await _repository.AddAsync(maintenance);
        }


        public async Task UpdateAsync(Models.Maintenance maintenance)
        {
            var existingMaintenance = await _repository.GetByIdAsync(maintenance.Id);
            if (existingMaintenance == null)
                throw new Exception($"Maintenance with ID {maintenance.Id} not found.");

            existingMaintenance.Observations = maintenance.Observations;
            existingMaintenance.LastUpdate = DateTime.UtcNow;
            existingMaintenance.StartDate = maintenance.StartDate;
            existingMaintenance.EndDate = maintenance.EndDate;

            // Atualizar partes
            foreach (var part in maintenance.MaintenanceParts)
            {
                var existingPart = existingMaintenance.MaintenanceParts.FirstOrDefault(p => p.PartId == part.PartId);

                if (existingPart != null)
                {
                    var quantityDifference = part.Quantity - existingPart.Quantity;

                    // Atualizar quantidade da peça
                    existingPart.Quantity = part.Quantity;

                    // Notificar ToolAPI da diferença
                    if (quantityDifference != 0)
                        await NotifyToolApi(part.PartId, quantityDifference);
                }
                else
                {
                    // Adicionar nova peça
                    existingMaintenance.MaintenanceParts.Add(part);

                    // Notificar ToolAPI da nova quantidade
                    await NotifyToolApi(part.PartId, part.Quantity);
                }
            }


            await _repository.UpdateAsync(existingMaintenance);
        }

        public async Task DeleteAsync(int id)
        {
            var maintenance = await _repository.GetByIdAsync(id);
            if (maintenance == null)
                throw new Exception($"Maintenance with ID {id} not found.");

            // Restaurar quantidades ao ToolAPI antes de deletar
            foreach (var part in maintenance.MaintenanceParts)
            {
                await NotifyToolApi(part.PartId, -part.Quantity); // Reverter estoque
            }

            await _repository.DeleteAsync(id);
        }

        private async Task NotifyToolApi(int partId, int quantityChange)
        {
            if (partId <= 0)
            {
                throw new Exception("Invalid PartId: PartId must be greater than zero.");
            }

            var payload = new
            {
                Id = partId,
                SubQuantity = quantityChange
            };

            var url = "http://toolapi:8080/api/Tool/quantity";
            var content = new StringContent(JsonSerializer.Serialize(payload));
            content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/json");

            var token = _httpContextAccessor.HttpContext?.Request.Headers["Authorization"].ToString();

            if (!string.IsNullOrWhiteSpace(token))
            {
                _httpClient.DefaultRequestHeaders.Authorization =
                    new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token.Replace("Bearer ", "").Trim());
            }

            // Enviar requisição PUT
            var response = await _httpClient.PutAsync(url, content);

            if (!response.IsSuccessStatusCode)
            {
                var errorDetails = await response.Content.ReadAsStringAsync();
                throw new Exception($"Failed to update tool quantity for PartId {partId}: {response.StatusCode}. Details: {errorDetails}");
            }

        }


    }
}
