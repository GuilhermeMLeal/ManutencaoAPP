namespace AuthUser.Domain.Interfaces
{
    public interface ISquadRepository
    {
        Task<IEnumerable<UserAuth.Domain.Entities.Squad>> GetAllSquad();
        Task<UserAuth.Domain.Entities.Squad> GetSquadById(int id);
        Task AddSquad(UserAuth.Domain.Entities.Squad entity);
        Task UpdateSquad(UserAuth.Domain.Entities.Squad entity);
        Task DeleteSquad(UserAuth.Domain.Entities.Squad entity);
    }
}
