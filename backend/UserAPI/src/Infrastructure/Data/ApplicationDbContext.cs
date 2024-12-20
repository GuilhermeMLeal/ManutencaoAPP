using Microsoft.EntityFrameworkCore;
using UserAuth.Domain.Entities;

namespace UserAuth.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<Domain.Entities.Squad> Squads { get; set; }
        public DbSet<UserSquad> UserSquads { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserRole>()
                .HasKey(ur => new { ur.UserId, ur.RoleId });

            modelBuilder.Entity<UserSquad>()
                .HasKey(us => new { us.UserId, us.SquadId });

            modelBuilder.Entity<UserRole>()
                .HasOne(ur => ur.User)
                .WithMany(u => u.UserRoles)
                .HasForeignKey(ur => ur.UserId);

            modelBuilder.Entity<UserRole>()
                .HasOne(ur => ur.Role)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(ur => ur.RoleId);

            modelBuilder.Entity<UserSquad>()
                .HasOne(us => us.User)
                .WithMany(u => u.UserSquads)
                .HasForeignKey(us => us.UserId);

            modelBuilder.Entity<UserSquad>()
                .HasOne(us => us.Squad)
                .WithMany(s => s.UserSquads)
                .HasForeignKey(us => us.SquadId);


            base.OnModelCreating(modelBuilder);
        }
    }

}