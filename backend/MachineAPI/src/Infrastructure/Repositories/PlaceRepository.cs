using Microsoft.EntityFrameworkCore;
using MachineAPI.Domain.Entities;
using MachineAPI.Domain.Interfaces;
using MachineAPI.Infrastructure.Data;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MachineAPI.Infrastructure.Repositories
{
    public class PlaceRepository : IPlaceRepository
    {
        private readonly ApplicationDbContext _context;

        public PlaceRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        // Recuperar todos os lugares
        public async Task<IEnumerable<Place>> GetAllAsync()
        {
            return await _context.Places.ToListAsync();
        }

        // Recuperar um lugar específico pelo ID
        public async Task<Place> GetByIdAsync(int id)
        {
            return await _context.Places.FirstOrDefaultAsync(p => p.Id == id);
        }

        // Adicionar um novo lugar
        public async Task AddAsync(Place place)
        {
            await _context.Places.AddAsync(place);
            await _context.SaveChangesAsync();
        }

        // Atualizar um lugar existente
        public async Task UpdateAsync(Place place)
        {
            var existingPlace = await _context.Places.FindAsync(place.Id);
            if (existingPlace == null)
                throw new KeyNotFoundException($"Place with ID {place.Id} not found.");

            // Atualizar apenas as propriedades necessárias
            existingPlace.Name = place.Name;

            _context.Places.Update(existingPlace);
            await _context.SaveChangesAsync();
        }

        // Remover um lugar
        public async Task DeleteAsync(Place place)
        {
            var existingPlace = await _context.Places.FindAsync(place.Id);
            if (existingPlace == null)
                throw new KeyNotFoundException($"Place with ID {place.Id} not found.");

            _context.Places.Remove(existingPlace);
            await _context.SaveChangesAsync();
        }
    }
}
