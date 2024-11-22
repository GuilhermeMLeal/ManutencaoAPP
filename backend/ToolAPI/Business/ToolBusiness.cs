using System.Collections.Generic;
using System.Threading.Tasks;
using ToolAPI.Models;
using ToolAPI.Repository;

namespace ToolAPI.Business
{
    public class ToolService
    {
        private readonly IToolRepository _toolRepository;

        public ToolService(IToolRepository toolRepository)
        {
            _toolRepository = toolRepository;
        }

        public async Task<IEnumerable<Tool>> GetAllTools()
        {
            return await _toolRepository.GetAllTool();
        }

        public async Task<Tool> GetToolById(int id)
        {
            var tool = await _toolRepository.GetToolById(id);
            if (tool == null)
            {
                throw new KeyNotFoundException($"Tool with ID {id} not found.");
            }
            return tool;
        }

        public async Task AddTool(Tool tool)
        {
            if (tool == null)
            {
                throw new ArgumentNullException(nameof(tool), "Tool cannot be null.");
            }

            if (string.IsNullOrEmpty(tool.Name))
            {
                throw new ArgumentException("Tool name is required.", nameof(tool.Name));
            }

            await _toolRepository.AddTool(tool);
        }

        public async Task UpdateTool(Tool tool)
        {
            if (tool == null)
            {
                throw new ArgumentNullException(nameof(tool), "Tool cannot be null.");
            }

            if (string.IsNullOrEmpty(tool.Name))
            {
                throw new ArgumentException("Tool name is required.", nameof(tool.Name));
            }

            var existingTool = await _toolRepository.GetToolById(tool.Id);
            if (existingTool == null)
            {
                throw new KeyNotFoundException($"Tool with ID {tool.Id} not found.");
            }

            await _toolRepository.UpdateTool(tool);
        }

        public async Task DeleteTool(int id)
        {
            var tool = await _toolRepository.GetToolById(id);
            if (tool == null)
            {
                throw new KeyNotFoundException($"Tool with ID {id} not found.");
            }

            await _toolRepository.DeleteTool(tool);
        }
    }
}
