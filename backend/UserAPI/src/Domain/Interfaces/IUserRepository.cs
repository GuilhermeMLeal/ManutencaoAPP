using UserAuth.Domain.Entities;

namespace UserAuth.Domain.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllUsers();
        Task<User> GetUserById(int id);
        Task<User> GetUserByEmail(string email);
        Task<User> FindUserByUsername(string username);
        Task AddUser(User user);
        Task UpdateUser(User user);
        Task DeleteUser(int id);

        Task<IEnumerable<Role>> GetRolesByUserId(int userId);
        Task AddRoleToUser(int userId, Role role);
        Task DeleteSquadToUser(int squadId);
        Task AddSquadToUser(int userId, UserAuth.Domain.Entities.Squad squad);

        Task RemoveRoleFromUser(int userId, int roleId);
    }
}
