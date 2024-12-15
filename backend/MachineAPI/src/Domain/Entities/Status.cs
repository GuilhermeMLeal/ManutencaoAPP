using MachineAPI.Domain.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace MachineAPI.Domain.Entities
{
    public class Status
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public List<Machine> Machines { get; set; } = new List<Machine>();
    }
}
