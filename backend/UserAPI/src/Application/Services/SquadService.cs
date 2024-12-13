using AuthUser.Domain.Interfaces;
using Squad.API.DTOs;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserAuth.API.DTOs;
using UserAuth.Application.Interfaces;
using UserAuth.Domain.Entities;
using UserAuth.Domain.Interfaces;
using UserAuth.Infrastructure.Repositories;

namespace UserAuth.Infrastructure.Services
{
    public class SquadService : ISquadService
    {
        private readonly ISquadRepository _squadRepository;
        private readonly IUserRepository _userRepository;

        public SquadService(ISquadRepository squadRepository, IUserRepository userRepository)
        {
            _squadRepository = squadRepository;
            _userRepository = userRepository;
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

            foreach (var userDTO in squadDTO.Users)
            {
                var existingUser = await _userRepository.GetUserById((int)userDTO.Id);
                var existingSquad = await _squadRepository.GetSquadById((int)squad.Id);
                if (existingUser == null)
                {
                    //existingSquad = new UserAuth.Domain.Entities.Squad { Name = squadDTO.Name };
                    //await _roleRepository.AddRole(existingRole); // Adicione um método para adicionar role
                }

                await _userRepository.AddSquadToUser(existingUser.Id, existingSquad);
            }
        }

        public async Task DeleteAllUsersOfSquads(int squadId)
        {
            await _userRepository.DeleteSquadToUser(squadId);
        }

        public async Task AddSquadToUser(int squadId, SquadDTO squadDTO)
        {
            var squad = await _squadRepository.GetSquadById(squadId);
            foreach (var user in squadDTO.Users)
            {
                _userRepository.AddSquadToUser((int)user.Id, squad);
            }
        }

        public async Task UpdateSquad(int id, SquadDTO squadDTO)
        {
            var squad = await _squadRepository.GetSquadById(id);

            if (squad == null)
                throw new KeyNotFoundException("Squad not found");

            squad.Name = squadDTO.Name;
            squad.Description = squadDTO.Description;

            await _squadRepository.UpdateSquad(squad);

            if(squadDTO.Users != null && squadDTO.Users.Count != 0)
            {
                try
                {
                    await DeleteAllUsersOfSquads(id);
                }
                catch
                {
                    
                }
               
                foreach (var user in squadDTO.Users)
                {
                    _userRepository.AddSquadToUser((int)user.Id, squad);
                }
            }
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
