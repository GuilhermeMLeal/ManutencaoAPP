using MachineAPI.API.DTOs;

namespace MachineAPI.Application.Interfaces
{
    public interface IStatusService
    {
        // Recupera todos os lugares
        Task<IEnumerable<StatusDTO>> GetAllStatus();
        Task<StatusDTO> GetStatusById(int id);
    }
}
