using MachineAPI.Domain.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace MachineAPI.Domain.Entities
{
    public class Machine
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Model { get; set; }
        public DateTime ManufactureDate { get; set; }
        public string SerialNumber { get; set; }

        public int? PlaceId { get; set; }
        public Place Place { get; set; }

        public int? StatusId { get; set; }
        public Status Status { get; set; }
    }
}
