using Microsoft.EntityFrameworkCore;
using Maintenance.Data;

namespace Maintenance.Repository
{
    public static class MigrationExtensions
    {
        public static void ApplyMigrations(this IApplicationBuilder app)
        {
            using IServiceScope scope = app.ApplicationServices.CreateScope();

            using MaintenanceDbContext dbContext =
                scope.ServiceProvider.GetRequiredService<MaintenanceDbContext>();

            dbContext.Database.Migrate();
        }
    }
}
