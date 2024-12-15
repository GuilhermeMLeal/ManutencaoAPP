using Microsoft.EntityFrameworkCore;
using MachineAPI.Domain.Entities;

namespace MachineAPI.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Machine> Machines { get; set; }
        public DbSet<Place> Places { get; set; }
        public DbSet<Status> Status { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Place>()
                .HasMany(p => p.Machines)
                .WithOne(m => m.Place)
                .HasForeignKey(m => m.PlaceId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Status>()
                .HasMany(p => p.Machines)
                .WithOne(m => m.Status)
                .HasForeignKey(m => m.StatusId)
                .OnDelete(DeleteBehavior.Cascade);

            // Se necessário, configurar o nome das tabelas no banco de dados
            modelBuilder.Entity<Machine>().ToTable("Machines");
            modelBuilder.Entity<Place>().ToTable("Places");
            modelBuilder.Entity<Status>().ToTable("Status");
        }
    }
}
