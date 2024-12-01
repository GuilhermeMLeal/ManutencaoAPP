namespace UserAuth.Domain.Entities
{
    public class Squad
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<UserSquad> UserSquads { get; set; } = new List<UserSquad>();
    }
}