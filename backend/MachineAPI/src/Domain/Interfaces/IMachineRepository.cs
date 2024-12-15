using MachineAPI.Domain.Entities;

namespace MachineAPI.Domain.Interfaces
{
    public interface IMachineRepository
    {
        Task<IEnumerable<Machine>> GetAllAsync();
        Task<Machine> GetByIdAsync(int id);
        Task AddAsync(Machine machine);
        Task UpdateAsync(Machine machine);
        Task DeleteAsync(int id);
    }
}
