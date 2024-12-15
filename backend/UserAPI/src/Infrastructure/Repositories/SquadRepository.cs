using AuthUser.Domain.Interfaces;
using UserAuth.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace AuthUser.Infrastructure.Repositories
{
    public class SquadRepository : ISquadRepository
    {
        private readonly ApplicationDbContext _context;

        public SquadRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<UserAuth.Domain.Entities.Squad>> GetAllSquad()
        {
            // Inclui os usuários associados ao Squad via UserSquads
            return await _context.Squads
                .Include(s => s.UserSquads)
                .ThenInclude(us => us.User) // Carrega os dados dos usuários associados
                .ToListAsync();
        }

        public async Task<UserAuth.Domain.Entities.Squad> GetSquadById(int id)
        {
            // Inclui os usuários associados ao Squad via UserSquads
            return await _context.Squads
                .Include(s => s.UserSquads)
                .ThenInclude(us => us.User) // Carrega os dados dos usuários associados
                .FirstOrDefaultAsync(s => s.Id == id);
        }


        public async Task AddSquad(UserAuth.Domain.Entities.Squad entity)
        {
            await _context.Squads.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateSquad(UserAuth.Domain.Entities.Squad entity)
        {
            _context.Squads.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteSquad(UserAuth.Domain.Entities.Squad entity)
        {
            _context.Squads.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }
}