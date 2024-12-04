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
        Task DeleteSquad(int id);
    }
}
