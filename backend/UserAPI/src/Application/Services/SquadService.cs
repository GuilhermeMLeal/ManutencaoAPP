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
                Description = s.Description,
                Users = s.UserSquads.Select(us => new UserDTO
                {
                    Id = us.User.Id,
                    Name = us.User.Name,
                    Email = us.User.Email,
                    Username = us.User.Username
                }).ToList()
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
                Description = squad.Description,
                Users = squad.UserSquads.Select(us => new UserDTO
                {
                    Id = us.User.Id,
                    Name = us.User.Name,
                    Email = us.User.Email,
                    Username = us.User.Username
                }).ToList()
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
                    //await _roleRepository.AddRole(existingRole); // Adicione um m�todo para adicionar role
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
            // Busca o Squad pelo ID
            var squad = await _squadRepository.GetSquadById(id);

            if (squad == null)
                throw new KeyNotFoundException("Squad not found");

            // Atualiza os campos do Squad
            squad.Name = squadDTO.Name;
            squad.Description = squadDTO.Description;

            // Atualiza o Squad no repositório
            await _squadRepository.UpdateSquad(squad);

            // Atualiza os usuários associados ao Squad
            if (squadDTO.Users != null && squadDTO.Users.Any())
            {
                try
                {
                    // Remove todos os usuários associados ao Squad
                    await DeleteAllUsersOfSquads(id);

                    // Adiciona os novos usuários ao Squad
                    foreach (var user in squadDTO.Users)
                    {
                        var userExists = await _userRepository.GetUserById((int)user.Id);
                        if (userExists == null)
                            throw new KeyNotFoundException($"User with ID {user.Id} not found");

                        await _userRepository.AddSquadToUser((int)user.Id, squad);
                    }
                }
                catch (Exception ex)
                {
                    // Loga o erro e relança a exceção para tratamento adequado
                    Console.Error.WriteLine($"Erro ao atualizar usuários do Squad {id}: {ex.Message}");
                    throw;
                }
            }
            else
            {
                // Se não há usuários na DTO, remove todos os associados
                await DeleteAllUsersOfSquads(id);
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
