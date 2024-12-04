using AuthUser.Domain.Interfaces;
using Squad.API.DTOs;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserAuth.Application.Interfaces;
using UserAuth.Domain.Entities;
using UserAuth.Domain.Interfaces;

namespace UserAuth.Infrastructure.Services
{
    public class SquadService : ISquadService
    {
        private readonly ISquadRepository _squadRepository;

        public SquadService(ISquadRepository squadRepository)
        {
            _squadRepository = squadRepository;
        }

        public async Task<IEnumerable<SquadDTO>> GetAllSquads()
        {
            var squads = await _squadRepository.GetAllSquad();
            return squads.Select(s => new SquadDTO
            {
                Id = s.Id,
                Name = s.Name,
                Description = s.Description
            });
        }

        public async Task<SquadDTO> GetSquadById(int id)
        {
            var squad = await _squadRepository.GetSquadById(id);

            if (squad == null)
                throw new KeyNotFoundException("Squad not found");

            return new SquadDTO
            {
                Id = squad.Id,
                Name = squad.Name,
                Description = squad.Description
            };
        }

        public async Task AddSquad(SquadDTO squadDTO)
        {
            var squad = new UserAuth.Domain.Entities.Squad
            {
                Name = squadDTO.Name,
                Description = squadDTO.Description
            };

            await _squadRepository.AddSquad(squad);
        }

        public async Task UpdateSquad(int id, SquadDTO squadDTO)
        {
            var squad = await _squadRepository.GetSquadById(id);

            if (squad == null)
                throw new KeyNotFoundException("Squad not found");

            squad.Name = squadDTO.Name;
            squad.Description = squadDTO.Description;

            await _squadRepository.UpdateSquad(squad);
        }

        public async Task DeleteSquad(int id)
        {
            var squad = await _squadRepository.GetSquadById(id);

            if (squad == null)
                throw new KeyNotFoundException("Squad not found");

            await _squadRepository.DeleteSquad(squad);
        }
    }
}
