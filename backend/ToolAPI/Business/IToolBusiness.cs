using System.Collections.Generic;
using System.Threading.Tasks;
using ToolAPI.Models;

namespace ToolAPI.Business
{
    public interface IToolBusiness
    {
        Task<IEnumerable<Tool>> GetAllTools();
        Task<Tool> GetToolById(int id);
        Task AddTool(Tool tool);
        Task UpdateTool(Tool tool);
        Task UpdateToolByQuantity(UpdateTool tool);
        Task DeleteTool(int id);
    }
}
