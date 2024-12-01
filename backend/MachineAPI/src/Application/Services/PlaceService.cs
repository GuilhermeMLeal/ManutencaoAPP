using MachineAPI.Application.Interfaces;
using MachineAPI.API.DTOs;
using MachineAPI.API.Extensions;
using MachineAPI.Domain.Entities;
using MachineAPI.Domain.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace MachineAPI.Application.Services
{
    public class PlaceService : IPlaceService
    {
        private readonly IPlaceRepository _placeRepository;

        public PlaceService(IPlaceRepository placeRepository)
        {
            _placeRepository = placeRepository;
        }

        public async Task<IEnumerable<PlaceDTO>> GetAllPlaces()
        {
            var places = await _placeRepository.GetAllAsync();
            if (places == null || !places.Any())
                throw new InvalidOperationException("No places found.");

            return places.Select(p => p.ToDto());
        }

        public async Task<PlaceDTO> GetPlaceById(int id)
        {
            var place = await _placeRepository.GetByIdAsync(id);
            if (place == null)
                throw new KeyNotFoundException($"Place with ID {id} not found.");

            return place.ToDto();
        }

        public async Task<PlaceDTO> AddPlace(PlaceDTO placeDto)
        {
            if (string.IsNullOrEmpty(placeDto.Name))
                throw new ArgumentException("Place name cannot be null or empty.");

            var place = placeDto.ToEntity();
            await _placeRepository.AddAsync(place);
            return place.ToDto();
        }

        public async Task<PlaceDTO> UpdatePlace(PlaceDTO placeDto)
        {
            var existingPlace = await _placeRepository.GetByIdAsync(placeDto.Id);
            if (existingPlace == null)
                throw new KeyNotFoundException($"Place with ID {placeDto.Id} not found.");

            if (string.IsNullOrEmpty(placeDto.Name))
                throw new ArgumentException("Place name cannot be null or empty.");

            existingPlace.Name = placeDto.Name;

            await _placeRepository.UpdateAsync(existingPlace);
            return existingPlace.ToDto();
        }

        public async Task DeletePlace(int id)
        {
            var place = await _placeRepository.GetByIdAsync(id);
            if (place == null)
                throw new KeyNotFoundException($"Place with ID {id} not found.");

            await _placeRepository.DeleteAsync(place);
        }
    }
}
