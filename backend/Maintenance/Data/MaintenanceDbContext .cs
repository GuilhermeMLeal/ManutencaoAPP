using Maintenance.Models;
using Microsoft.EntityFrameworkCore;

namespace Maintenance.Data
{
    public class MaintenanceDbContext : DbContext
    {
        public DbSet<Models.Maintenance> Maintenances { get; set; }
        public DbSet<MaintenancePart> MaintenanceParts { get; set; }

        public MaintenanceDbContext(DbContextOptions<MaintenanceDbContext> options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MaintenancePart>()
                .HasOne(mp => mp.Maintenance)
                .WithMany(m => m.MaintenanceParts)
                .HasForeignKey(mp => mp.MaintenanceId);

            base.OnModelCreating(modelBuilder);
        }
    }
}
