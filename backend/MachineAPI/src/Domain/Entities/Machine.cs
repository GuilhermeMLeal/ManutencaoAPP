using MachineAPI.src.Domain.Enums;

namespace MachineAPI.Domain.Entities
{
    public class Machine
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public MachineType Type { get; set; }
        public string Model { get; set; }
        public DateTime ManufactureDate { get; set; }
        public string SerialNumber { get; set; }
        public string Status { get; set; }
        
        public int PlaceId { get; set; }
        public Place Place { get; set; }

        public string ImageUrl { get; set; }

    }
}
