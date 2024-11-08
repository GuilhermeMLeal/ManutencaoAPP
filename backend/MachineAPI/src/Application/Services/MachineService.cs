using MachineAPI.Application.Interfaces;
using MachineAPI.API.DTOs;
using MachineAPI.API.Extensions;
using MachineAPI.Domain.Entities;
using MachineAPI.Domain.Interfaces;
using MachineAPI.src.API.DTOs;

namespace MachineAPI.Application.Services
{
    public class MachineService : IMachineService
    {
        private readonly IMachineRepository _machineRepository;

        public MachineService(IMachineRepository machineRepository)
        {
            _machineRepository = machineRepository;
        }

        public async Task<IEnumerable<UpdateMachineDTO>> GetAllMachines()
        {
            var machines = await _machineRepository.GetAllAsync();
            return machines.Select(m => m.ToDto());
        }

        public async Task<Machine> AddMachine(CreateMachineDto machineDto)
        {
            var machine = machineDto.ToEntity();
            await _machineRepository.AddAsync(machine);
            return machine.ToDto();
        }

        public Task<Machine> UpdateMachine(UpdateMachineDTO machineDto)
        {
            throw new NotImplementedException();
        }
    }
}
