using MachineAPI.API.DTOs;
using MachineAPI.src.API.DTOs;

namespace MachineAPI.Application.Interfaces
{
    public interface IMachineService
    {
        Task<IEnumerable<MachineDTO>> GetAllMachines();
        Task<MachineDTO> GetMachineById(int id);
        Task<MachineDTO> AddMachine(MachineCreateDto machineCreateDto);
        Task<MachineDTO> UpdateMachine(MachineUpdateDto machineUpdateDto);

    }
}
