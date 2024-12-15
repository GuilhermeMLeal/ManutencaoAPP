using Maintenance.Data;
using Microsoft.EntityFrameworkCore;

namespace Maintenance.Repository
{
    public class MaintenanceRepository
    {
        private readonly MaintenanceDbContext _context;

        public MaintenanceRepository(MaintenanceDbContext context)
        {
            _context = context;
        }

        public async Task<List<Models.Maintenance>> GetAllAsync()
        {
            return await _context.Maintenances.Include(m => m.MaintenanceParts).ToListAsync();
        }

        public async Task<Models.Maintenance> GetByIdAsync(int id)
        {
            return await _context.Maintenances
                .Include(m => m.MaintenanceParts)
                .FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task AddAsync(Models.Maintenance maintenance)
        {
            await _context.Maintenances.AddAsync(maintenance);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Models.Maintenance maintenance)
        {
            _context.Maintenances.Update(maintenance);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var maintenance = await GetByIdAsync(id);
            if (maintenance != null)
            {
                _context.Maintenances.Remove(maintenance);
                await _context.SaveChangesAsync();
            }
        }
    }
}
