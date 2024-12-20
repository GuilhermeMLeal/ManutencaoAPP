using System.ComponentModel.DataAnnotations.Schema;

namespace UserAuth.Domain.Entities
{
    public class User
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public List<UserRole> UserRoles { get; set; } = new List<UserRole>();
        public List<UserSquad> UserSquads { get; set; } = new List<UserSquad>();
    }
}