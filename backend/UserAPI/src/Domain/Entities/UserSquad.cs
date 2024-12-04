using UserAuth.Domain.Entities;

namespace UserAuth.Domain.Entities
{
    public class UserSquad
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public int SquadId { get; set; }
        public Squad Squad { get; set; }
    }
}
