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

        public async Task<IEnumerable<MachineDTO>> GetAllMachines()
        {
            var machines = await _machineRepository.GetAllAsync();
            return machines.Select(m => m.ToDto());
        }

        public async Task<MachineDTO> GetMachineById(int id)
        {
            var machine = await _machineRepository.GetByIdAsync(id);
            if (machine == null)
                throw new KeyNotFoundException($"Machine with ID {id} not found.");

            return machine.ToDto();
        }

        public async Task<MachineDTO> AddMachine(MachineCreateDto machineCreateDto)
        {
            var machine = machineCreateDto.ToEntity();
            await _machineRepository.AddAsync(machine);
            return machine.ToDto();
        }

        public async Task<MachineDTO> UpdateMachine(MachineUpdateDto machineUpdateDto)
        {
            var existingMachine = await _machineRepository.GetByIdAsync(machineUpdateDto.Id);
            if (existingMachine == null)
                throw new KeyNotFoundException($"Machine with ID {machineUpdateDto.Id} not found.");

            existingMachine.Name = machineUpdateDto.Name;
            existingMachine.Type = machineUpdateDto.Type;
            existingMachine.Model = machineUpdateDto.Model;
            existingMachine.ManufactureDate = machineUpdateDto.ManufactureDate;
            existingMachine.Status = machineUpdateDto.Status;
            existingMachine.PlaceId = machineUpdateDto.PlaceId;

            await _machineRepository.UpdateAsync(existingMachine);
            return existingMachine.ToDto();
        }
    }
}
