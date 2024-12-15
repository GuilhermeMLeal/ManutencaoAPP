using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToolAPI.Data;
using ToolAPI.Models;

namespace ToolAPI.Repository
{
    public class ToolRepository : IToolRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<Tool> _dbSet;

        public ToolRepository(ApplicationDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<Tool>();
        }

        public async Task<IEnumerable<Tool>> GetAllTool()
        {
            try
            {
                return await _dbSet.AsNoTracking().ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while retrieving tools.", ex);
            }
        }

        public async Task<Tool> GetToolById(int id)
        {
            try
            {
                var tool = await _dbSet.AsNoTracking().FirstOrDefaultAsync(t => t.Id == id);
                if (tool == null)
                {
                    throw new KeyNotFoundException($"Tool with ID {id} not found.");
                }
                return tool;
            }
            catch (KeyNotFoundException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while retrieving the tool with ID {id}.", ex);
            }
        }

        public async Task AddTool(Tool entity)
        {
            try
            {
                if (entity == null)
                {
                    throw new ArgumentNullException(nameof(entity), "Tool cannot be null.");
                }

                await _dbSet.AddAsync(entity);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                throw new Exception("An error occurred while adding the tool to the database.", ex);
            }
            catch (Exception ex)
            {
                throw new Exception("An unexpected error occurred while adding the tool.", ex);
            }
        }

        public async Task UpdateTool(Tool entity)
        {
            try
            {
                if (entity == null)
                {
                    throw new ArgumentNullException(nameof(entity), "Tool cannot be null.");
                }

                var existingTool = await _dbSet.FindAsync(entity.Id);
                if (existingTool == null)
                {
                    throw new KeyNotFoundException($"Tool with ID {entity.Id} not found.");
                }

                _context.Entry(existingTool).CurrentValues.SetValues(entity);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                throw new Exception($"A concurrency error occurred while updating the tool with ID {entity.Id}.", ex);
            }
            catch (Exception ex)
            {
                throw new Exception($"An unexpected error occurred while updating the tool with ID {entity.Id}.", ex);
            }
        }

        public async Task DeleteTool(Tool entity)
        {
            try
            {
                if (entity == null)
                {
                    throw new ArgumentNullException(nameof(entity), "Tool cannot be null.");
                }

                var existingTool = await _dbSet.FindAsync(entity.Id);
                if (existingTool == null)
                {
                    throw new KeyNotFoundException($"Tool with ID {entity.Id} not found.");
                }

                _dbSet.Remove(existingTool);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                throw new Exception($"An error occurred while deleting the tool with ID {entity.Id}.", ex);
            }
            catch (Exception ex)
            {
                throw new Exception($"An unexpected error occurred while deleting the tool with ID {entity.Id}.", ex);
            }
        }
    }
}
