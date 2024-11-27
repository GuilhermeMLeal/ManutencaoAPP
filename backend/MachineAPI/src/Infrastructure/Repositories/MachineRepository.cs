using Microsoft.EntityFrameworkCore;
using MachineAPI.Domain.Entities;
using MachineAPI.Domain.Interfaces;
using MachineAPI.Infrastructure.Data;

namespace MachineAPI.Infrastructure.Repositories
{
    public class MachineRepository : IMachineRepository
    {
        private readonly ApplicationDbContext _context;

        public MachineRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Machine>> GetAllAsync()
        {
            return await _context.Machines.Include(m => m.Place).ToListAsync();
        }

        public async Task<Machine> GetByIdAsync(int id)
        {
            return await _context.Machines.Include(m => m.Place).FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task AddAsync(Machine machine)
        {
            await _context.Set<Machine>().AddAsync(machine);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateAsync(Machine machine)
        {
            var existingMachine = await _context.Set<Machine>().FindAsync(machine.Id);
            if (existingMachine == null)
            {
                throw new KeyNotFoundException($"Machine with ID {machine.Id} not found.");
            }

            existingMachine.Name = machine.Name;
            existingMachine.Type = machine.Type;
            existingMachine.Model = machine.Model;
            existingMachine.ManufactureDate = machine.ManufactureDate;
            existingMachine.Status = machine.Status;
            existingMachine.PlaceId = machine.PlaceId;

            _context.Set<Machine>().Update(existingMachine);
            await _context.SaveChangesAsync();
        }

    }
}
