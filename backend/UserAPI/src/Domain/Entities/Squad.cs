using System.ComponentModel.DataAnnotations.Schema;

namespace UserAuth.Domain.Entities
{
    public class Squad
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<UserSquad> UserSquads { get; set; } = new List<UserSquad>();
    }
}