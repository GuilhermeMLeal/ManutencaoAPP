using ToolAPI.Models;

namespace ToolAPI.Repository
{
    public interface IToolRepository
    {
        Task<IEnumerable<Tool>> GetAllTool();
        Task<Tool> GetToolById(int id);
        Task AddTool(Tool entity);
        Task UpdateTool(Tool entity);
        Task DeleteTool(Tool entity);
    }
}
