using System.ComponentModel.DataAnnotations.Schema;

namespace MachineAPI.Domain.Entities
{
    public class Place
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Observation { get; set; }

        public List<Machine> Machines { get; set; } = new List<Machine>();
    }
}
