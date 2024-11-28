using MachineAPI.API.DTOs;

namespace MachineAPI.Application.Interfaces
{
    public interface IPlaceService
    {
        // Recupera todos os lugares
        Task<IEnumerable<PlaceDTO>> GetAllPlaces();

        // Recupera um lugar específico pelo ID
        Task<PlaceDTO> GetPlaceById(int id);

        // Adiciona um novo lugar
        Task<PlaceDTO> AddPlace(PlaceDTO placeDto);

        // Atualiza um lugar existente
        Task<PlaceDTO> UpdatePlace(PlaceDTO placeDto);

        // Remove um lugar pelo ID
        Task DeletePlace(int id);
    }
}
