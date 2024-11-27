using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using ToolAPI.Business;
using ToolAPI.Data;
using ToolAPI.Repository;

namespace ToolAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();

            // Swagger configuration
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Machines API",
                    Version = "v1"
                });
            });
            builder.Services.AddScoped<IToolBusiness, ToolBusiness>();
            builder.Services.AddScoped<IToolRepository, ToolRepository>();

            // Database configuration
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

            // CORS configuration
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAPIGateway",
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:3002")
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                    });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // Uncomment the next line if HTTPS redirection is required.
            // app.UseHttpsRedirection();

            app.UseCors("AllowAPIGateway");

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}