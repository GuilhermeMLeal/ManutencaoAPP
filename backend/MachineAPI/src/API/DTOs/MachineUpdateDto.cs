namespace MachineAPI.src.API.DTOs
{
    public class MachineUpdateDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Model { get; set; }
        public DateTime ManufactureDate { get; set; }
        public string Status { get; set; }
        public int PlaceId { get; set; }
    }
}
