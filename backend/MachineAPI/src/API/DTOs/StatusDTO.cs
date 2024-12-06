namespace MachineAPI.API.DTOs
{
    public class StatusDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<MachineDTO>? Machines { get; set; }
    }
}
