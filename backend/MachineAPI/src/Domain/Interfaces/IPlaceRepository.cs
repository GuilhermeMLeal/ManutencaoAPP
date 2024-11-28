using MachineAPI.Domain.Entities;

namespace MachineAPI.Domain.Interfaces
{
    public interface IPlaceRepository
    {
        // Recupera todos os lugares
        Task<IEnumerable<Place>> GetAllAsync();

        // Recupera um lugar específico pelo ID
        Task<Place> GetByIdAsync(int id);

        // Adiciona um novo lugar
        Task AddAsync(Place place);

        // Atualiza um lugar existente
        Task UpdateAsync(Place place);

        // Remove um lugar existente
        Task DeleteAsync(Place place);
    }
}
