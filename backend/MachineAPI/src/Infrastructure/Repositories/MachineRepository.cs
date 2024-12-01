using Microsoft.EntityFrameworkCore;
using MachineAPI.Domain.Entities;
using MachineAPI.Domain.Interfaces;
using MachineAPI.Infrastructure.Data;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System;

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
            // Verificar se PlaceId é válido, se o PlaceId foi fornecido
            if (machine.PlaceId.HasValue)
            {
                var place = await _context.Places.FindAsync(machine.PlaceId.Value);
                if (place == null)
                {
                    throw new ArgumentException($"O PlaceId {machine.PlaceId} fornecido não existe.");
                }
            }

            // Adicionar máquina ao banco
            await _context.Machines.AddAsync(machine);
            await _context.SaveChangesAsync();
        }


        public async Task UpdateAsync(Machine machine)
        {
            var existingMachine = await _context.Machines.FindAsync(machine.Id);
            if (existingMachine == null)
            {
                throw new KeyNotFoundException($"Máquina com ID {machine.Id} não encontrada.");
            }

            // Verificar se PlaceId é válido
            if (machine.PlaceId != null)
            {
                var place = await _context.Places.FindAsync(machine.PlaceId);
                if (place == null)
                {
                    throw new ArgumentException("O PlaceId fornecido não existe.");
                }
            }

            // Atualizar as propriedades da máquina
            existingMachine.Name = machine.Name;
            existingMachine.Type = machine.Type;
            existingMachine.Model = machine.Model;
            existingMachine.ManufactureDate = machine.ManufactureDate;
            existingMachine.Status = machine.Status;
            existingMachine.PlaceId = machine.PlaceId;

            // Marcar a máquina para atualização
            _context.Machines.Update(existingMachine);
            await _context.SaveChangesAsync();
        }
    }
}
