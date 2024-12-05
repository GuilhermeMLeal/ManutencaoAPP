using Maintenance.Models;
using Maintenance.Repository;
using System.Text.Json;

namespace Maintenance.Business
{
    public class MaintenanceBusiness
    {
        private readonly MaintenanceRepository _repository;
        private readonly HttpClient _httpClient;

        public MaintenanceBusiness(MaintenanceRepository repository, IHttpClientFactory httpClientFactory)
        {
            _repository = repository;
            _httpClient = httpClientFactory.CreateClient();
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

            // Notificar ToolAPI para decrementar peças no estoque
            foreach (var part in maintenance.MaintenanceParts)
            {
                await NotifyToolApi(part.PartId, part.Quantity);
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
                    var difference = part.Quantity - existingPart.Quantity;
                    existingPart.Quantity = part.Quantity;

                    // Notificar ToolAPI para ajustar quantidade
                    if (difference != 0)
                        await NotifyToolApi(part.PartId, difference);
                }
                else
                {
                    existingMaintenance.MaintenanceParts.Add(part);

                    // Notificar ToolAPI para decrementar nova peça
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
            var url = $"http://toolapi:8080/api/tool/update-quantity/{partId}";
            var payload = new { Quantity = quantityChange };
            var content = new StringContent(JsonSerializer.Serialize(payload));
            content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/json");

            var response = await _httpClient.PutAsync(url, content);
            if (!response.IsSuccessStatusCode)
                throw new Exception($"Failed to update tool quantity for PartId {partId}: {response.ReasonPhrase}");
        }
    }
}
