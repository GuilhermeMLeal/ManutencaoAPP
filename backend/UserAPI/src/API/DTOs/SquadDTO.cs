using UserAuth.API.DTOs;
using UserAuth.Domain.Entities;

namespace Squad.API.DTOs
{
    public class SquadDTO
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }

        public List<UserDTO> Users{ get; set; } = new List<UserDTO>();
    }
}