using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using System.Text;
using MachineAPI.API.Extensions;
using MachineAPI.Application.Interfaces;
using MachineAPI.Application.Services;
using MachineAPI.Domain.Interfaces;
using MachineAPI.Infrastructure.Repositories;
using MachineAPI.Infrastructure.Data;
using MachineAPI.API.Controllers.Validation;

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
        services.AddScoped<VerifyToken>();
        //services.AddCors(options =>
        //{
        //    options.AddPolicy("AllowAPIGateway",
        //        builder =>
        //        {
        //            builder.WithOrigins("http://localhost:3002") // Atualizar para o endereço correto do cliente
        //                .AllowAnyMethod()
        //                .AllowAnyHeader();
        //        });
        //});

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
        services.AddCors(options =>
        {
            options.AddPolicy("AllowAll", policy =>
            {
                policy.AllowAnyOrigin() // Permite chamadas de qualquer origem
                      .AllowAnyMethod() // Permite todos os métodos (GET, POST, PUT, DELETE, etc.)
                      .AllowAnyHeader(); // Permite todos os cabeçalhos
            });
        });

        services.AddAuthentication();
        services.AddAuthorization();

        services.AddSingleton<IConfiguration>(_configuration);
        services.AddHttpClient();

    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        //app.UseCors("AllowAPIGateway");
        app.UseCors("AllowAll");
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
        using (var scope = app.ApplicationServices.CreateScope())
        {
            var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            context.Database.Migrate();

            // Seed de Places
            if (!context.Places.Any())
            {
                var place1 = new MachineAPI.Domain.Entities.Place
                {
                    Name = "Lugar 1",
                    Description = "Ferramentas pesadas",
                    Observation = "Ferramentas pesadas"
                };

                var place2 = new MachineAPI.Domain.Entities.Place
                {
                    Name = "Lugar 2",
                    Description = "Ferramentas pesadas",
                    Observation = "Ferramentas pesadas"
                };
                context.Places.Add(place1);
                context.Places.Add(place2);
                context.SaveChanges();
                Console.WriteLine("Lugar salvo.");
            }
        }
    }
}
