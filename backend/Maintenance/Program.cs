
using Maintenance.Business;
using Maintenance.Data;
using Maintenance.Repository;
using Microsoft.EntityFrameworkCore;

namespace Maintenance
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
                    options.JsonSerializerOptions.DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull;
                });

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddHttpClient();
            builder.Services.AddHttpContextAccessor();
            builder.Services.AddHttpContextAccessor();
            builder.Services.AddScoped<Maintenance.Controllers.Validation.VerifyToken>();
            builder.Services.AddScoped<MaintenanceBusiness>();
            builder.Services.AddScoped<MaintenanceRepository>();
            // Database configuration
            builder.Services.AddDbContext<MaintenanceDbContext>(options =>
                options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy =>
                {
                    policy.AllowAnyOrigin() // Permite chamadas de qualquer origem
                          .AllowAnyMethod() // Permite todos os métodos (GET, POST, PUT, DELETE, etc.)
                          .AllowAnyHeader(); // Permite todos os cabeçalhos
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            builder.Logging.AddConsole();
            builder.Logging.AddDebug();

            app.UseHttpsRedirection();

            app.UseAuthorization();
            app.ApplyMigrations();
            app.UseCors("AllowAll");

            app.MapControllers();

            app.Run();
        }
    }
}
