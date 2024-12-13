using Squad.API.DTOs;
using UserAuth.API.DTOs;

namespace UserAuth.Application.Interfaces
{
    public interface ISquadService
    {
        Task<IEnumerable<SquadDTO>> GetAllSquads();
        Task<SquadDTO> GetSquadById(int id);
        Task AddSquad(SquadDTO roleDTO);
        Task UpdateSquad(int id, SquadDTO roleDTO);
        Task AddSquadToUser(int squadId, SquadDTO squadDTO);
        Task DeleteSquad(int id);
        Task DeleteAllUsersOfSquads(int squadId);
    }
}
