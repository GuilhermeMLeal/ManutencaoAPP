using MachineAPI.API.DTOs;
using MachineAPI.Domain.Entities;
using MachineAPI.src.API.DTOs;

namespace MachineAPI.Application.Interfaces
{
    public interface IMachineService
    {
        Task<IEnumerable<UpdateMachineDTO>> GetAllMachines();
        Task<Machine> AddMachine(CreateMachineDto machineDto);
        Task<Machine> UpdateMachine(UpdateMachineDTO machineDto);

    }
}
