using MachineAPI.src.Domain.Enums;

namespace MachineAPI.src.API.DTOs
{
    public class CreateMachineDto
    {
        public string Name { get; set; }
        public MachineType Type { get; set; }
        public string Model { get; set; }
        public DateTime ManufactureDate { get; set; }
        public string SerialNumber { get; set; }
        public string Status { get; set; }
        public int PlaceId { get; set; }
        public string ImageUrl { get; set; }
    }
}
