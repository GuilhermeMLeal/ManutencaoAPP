using MachineAPI.Domain.Entities;

namespace MachineAPI.Domain.Interfaces
{
    public interface IStatusRepository
    {
        Task<IEnumerable<Status>> GetAllAsync();
        Task<Status> GetStatusById(int id);
    }
}
