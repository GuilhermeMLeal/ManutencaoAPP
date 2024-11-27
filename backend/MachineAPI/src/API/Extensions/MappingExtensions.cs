using MachineAPI.API.DTOs;
using MachineAPI.Domain.Entities;
using MachineAPI.src.API.DTOs;

namespace MachineAPI.API.Extensions
{
    public static class MappingExtensions
    {
        public static Machine ToEntity(this MachineCreateDto createDto)
        {
            return new Machine
            {
                Name = createDto.Name,
                Type = createDto.Type,
                Model = createDto.Model,
                ManufactureDate = createDto.ManufactureDate,
                SerialNumber = createDto.SerialNumber,
                Status = createDto.Status,
                PlaceId = createDto.PlaceId
            };
        }
        public static Machine ToEntity(this MachineUpdateDto updateDto)
        {
            return new Machine
            {
                Id = updateDto.Id,
                Name = updateDto.Name,
                Type = updateDto.Type,
                Model = updateDto.Model,
                ManufactureDate = updateDto.ManufactureDate,
                Status = updateDto.Status,
                PlaceId = updateDto.PlaceId
            };
        }
        public static MachineDTO ToDto(this Machine machine)
        {
            return new MachineDTO
            {
                Id = machine.Id,
                Name = machine.Name,
                Type = machine.Type,
                Model = machine.Model,
                ManufactureDate = machine.ManufactureDate,
                SerialNumber = machine.SerialNumber,
                Status = machine.Status,
                PlaceId = machine.PlaceId
            };
        }

        public static PlaceDTO ToDto(this Place place)
        {
            return new PlaceDTO
            {
                Id = place.Id,
                Name = place.Name,
                Description = place.Description,
                Observation = place.Observation,
                Machines = place.Machines?.Select(m => m.ToDto()).ToList()
            };
        }

        public static Machine ToEntity(this MachineDTO machineDto)
        {
            return new Machine
            {
                Id = machineDto.Id,
                Name = machineDto.Name,
                Type = machineDto.Type,
                Model = machineDto.Model,
                ManufactureDate = machineDto.ManufactureDate,
                SerialNumber = machineDto.SerialNumber,
                Status = machineDto.Status,
                PlaceId = machineDto.PlaceId
            };
        }

        public static Place ToEntity(this PlaceDTO placeDto)
        {
            return new Place
            {
                Id = placeDto.Id,
                Name = placeDto.Name,
                Description = placeDto.Description,
                Observation = placeDto.Observation,
            };
        }
    }
}