using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using System.Net;
using ToolApi.Controllers.Validation;
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
            builder.Services.AddHttpClient();
            builder.Services.AddHttpContextAccessor(); 
            builder.Services.AddScoped<VerifyToken>();  

            // Database configuration
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
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


            // Garante que as migrações sejam aplicadas automaticamente
            //app.ApplyMigrations();
            app.UseCors("AllowAll");
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}