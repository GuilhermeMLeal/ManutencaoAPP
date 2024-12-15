using MachineAPI.Application.Interfaces;
using MachineAPI.API.DTOs;
using MachineAPI.API.Extensions;
using MachineAPI.Domain.Entities;
using MachineAPI.Domain.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;
using MachineAPI.src.API.DTOs;

namespace MachineAPI.Application.Services
{
    public class MachineService : IMachineService
    {
        private readonly IMachineRepository _machineRepository;
        private readonly IPlaceRepository _placeRepository;  // Para validar PlaceId

        public MachineService(IMachineRepository machineRepository, IPlaceRepository placeRepository)
        {
            _machineRepository = machineRepository;
            _placeRepository = placeRepository;
        }

        public async Task<IEnumerable<MachineDTO>> GetAllMachines()
        {
            var machines = await _machineRepository.GetAllAsync();
            if (machines == null || !machines.Any())
            {
                throw new InvalidOperationException("No machines found.");
            }
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
            // Valida o PlaceId antes de adicionar a m�quina
            if (machineCreateDto.PlaceId.HasValue)
            {
                var place = await _placeRepository.GetByIdAsync(machineCreateDto.PlaceId.Value);
                if (place == null)
                {
                    throw new ArgumentException($"Place with ID {machineCreateDto.PlaceId} does not exist.");
                }
            }

            var machine = machineCreateDto.ToEntity();
            await _machineRepository.AddAsync(machine);
            return machine.ToDto();
        }

        public async Task<MachineDTO> UpdateMachine(MachineUpdateDto machineUpdateDto)
        {
            var existingMachine = await _machineRepository.GetByIdAsync(machineUpdateDto.Id);
            if (existingMachine == null)
                throw new KeyNotFoundException($"Machine with ID {machineUpdateDto.Id} not found.");

            // Valida o PlaceId antes de atualizar a m�quina
            if (machineUpdateDto.PlaceId != null)
            {
                var place = await _placeRepository.GetByIdAsync(machineUpdateDto.PlaceId);
                if (place == null)
                {
                    throw new ArgumentException($"Place with ID {machineUpdateDto.PlaceId} does not exist.");
                }
            }

            existingMachine.Name = machineUpdateDto.Name;
            existingMachine.Type = machineUpdateDto.Type;
            existingMachine.Model = machineUpdateDto.Model;
            existingMachine.ManufactureDate = machineUpdateDto.ManufactureDate;
            existingMachine.StatusId = machineUpdateDto.StatusId;
            existingMachine.PlaceId = machineUpdateDto.PlaceId;

            await _machineRepository.UpdateAsync(existingMachine);
            return existingMachine.ToDto();
        }
        
        public async Task DeleteMachine(int id)
        {
            var existingMachine = await _machineRepository.GetByIdAsync(id);
            if (existingMachine == null)
            {
                throw new KeyNotFoundException($"Machine with ID {id} not found.");
            }

            await _machineRepository.DeleteAsync(id);
        }
    }
}
