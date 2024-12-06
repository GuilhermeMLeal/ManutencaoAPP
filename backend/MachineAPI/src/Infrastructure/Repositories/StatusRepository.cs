using Microsoft.EntityFrameworkCore;
using MachineAPI.Domain.Entities;
using MachineAPI.Domain.Interfaces;
using MachineAPI.Infrastructure.Data;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System;
using MachineAPI.API.Extensions;

namespace MachineAPI.Infrastructure.Repositories
{
    public class StatusRepository : IStatusRepository
    {
        private readonly ApplicationDbContext _context;

        public StatusRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Status>> GetAllAsync()
        {
            return await _context.Status.ToListAsync();
        }
        public async Task<Status> GetStatusById(int id)
        {
            return await _context.Status.FirstOrDefaultAsync(p => p.Id == id);
        }
    }
}
