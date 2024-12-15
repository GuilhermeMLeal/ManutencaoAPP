using Microsoft.EntityFrameworkCore;
using UserAuth.Domain.Entities;
using UserAuth.Domain.Interfaces;
using UserAuth.Infrastructure.Data;

namespace UserAuth.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return await _context.Users.Include(u => u.UserRoles).ThenInclude(ur => ur.Role).Include(u => u.UserSquads).ThenInclude(ur => ur.Squad).ToListAsync();
        }

        public async Task<User> GetUserById(int id)
        {
            return await _context.Users.Include(u => u.UserRoles).ThenInclude(ur => ur.Role).Include(u => u.UserSquads).ThenInclude(ur => ur.Squad).SingleOrDefaultAsync(u => u.Id == id);
        }

        public async Task<User> GetUserByEmail(string email)
        {
            return await _context.Users.Include(u => u.UserRoles).ThenInclude(ur => ur.Role)
                                       .SingleOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User> FindUserByUsername(string username)
        {
            return await _context.Users.Include(u => u.UserRoles).ThenInclude(ur => ur.Role)
                                       .SingleOrDefaultAsync(u => u.Username == username);
        }

        public async Task AddUser(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateUser(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Role>> GetRolesByUserId(int userId)
        {
            return await _context.UserRoles
                .Where(ur => ur.UserId == userId)
                .Select(ur => ur.Role)
                .ToListAsync();
        }

        public async Task AddRoleToUser(int userId, Role role)
        {
            var userRole = new UserRole { UserId = userId, RoleId = role.Id };
            await _context.UserRoles.AddAsync(userRole);
            await _context.SaveChangesAsync();
        }
        public async Task AddSquadToUser(int userId, UserAuth.Domain.Entities.Squad squad)
        {
            var userSquad = new UserSquad { UserId = userId, SquadId = squad.Id };
            await _context.UserSquads.AddAsync(userSquad);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteSquadToUser(int squadId)
        {
            // Busca todas as relações onde SquadId corresponde ao fornecido
            var userSquads = await _context.UserSquads
                .Where(us => us.SquadId == squadId)
                .ToListAsync();

            // Verifica se existem relações antes de tentar remover
            if (userSquads.Any())
            {
                _context.UserSquads.RemoveRange(userSquads); // Remove todas as relações encontradas
                await _context.SaveChangesAsync(); // Salva as alterações
            }
            else
            {
                throw new KeyNotFoundException("Nenhuma relação encontrada para o SquadId especificado.");
            }
        }

        public async Task RemoveRoleFromUser(int userId, int roleId)
        {
            var userRole = await _context.UserRoles
                .SingleOrDefaultAsync(ur => ur.UserId == userId && ur.RoleId == roleId);
            if (userRole != null)
            {
                _context.UserRoles.Remove(userRole);
                await _context.SaveChangesAsync();
            }
        }
    }
}
