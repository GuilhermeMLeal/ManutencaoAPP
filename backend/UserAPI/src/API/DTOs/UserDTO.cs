using Squad.API.DTOs;

namespace UserAuth.API.DTOs
{
    public class UserDTO
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public List<RoleDTO> Roles { get; set; } = new List<RoleDTO>();

        public List<SquadDTO> Squads { get; set; } = new List<SquadDTO>();
    }
}