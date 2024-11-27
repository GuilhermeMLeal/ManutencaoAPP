using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using System.Text;
using MachineAPI.API.Extensions;
using MachineAPI.Application.Interfaces;
using MachineAPI.Application.Services;
using MachineAPI.Domain.Interfaces;
using MachineAPI.Infrastructure.Repositories;
using MachineAPI.Infrastructure.Data;

public class Startup
{
    private readonly IConfiguration _configuration;

    public Startup(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(_configuration.GetConnectionString("DefaultConnection"))
        );

        services.AddScoped<IMachineService, MachineService>();
        services.AddScoped<IPlaceService, PlaceService>();
        services.AddScoped<IMachineRepository, MachineRepository>();
        services.AddScoped<IPlaceRepository, PlaceRepository>();

        services.AddCors(options =>
        {
            options.AddPolicy("AllowAPIGateway",
                builder =>
                {
                    builder.WithOrigins("http://localhost:3002") // Atualizar para o endereço correto do cliente
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });
        });

        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "Machines API",
                Version = "v1"
            });
        });

        services.AddAuthentication();
        services.AddAuthorization();

        services.AddSingleton<IConfiguration>(_configuration);
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        app.UseCors("AllowAPIGateway");

        // Adiciona o Swagger e garante que o caminho funcione fora do Docker
        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
            // Certifique-se de que o caminho seja acessível tanto dentro quanto fora do Docker
            string swaggerJsonBasePath = string.IsNullOrWhiteSpace(c.RoutePrefix) ? "." : "..";
            c.SwaggerEndpoint($"{swaggerJsonBasePath}/swagger/v1/swagger.json", "Machine API V1");
            c.RoutePrefix = "swagger"; // Define uma rota padrão para evitar conflitos
        });

        // Garante que as migrações sejam aplicadas automaticamente
        app.ApplyMigrations();

        // Remova o redirecionamento HTTPS se não for necessário
        // app.UseHttpsRedirection();

        app.UseRouting();

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}
