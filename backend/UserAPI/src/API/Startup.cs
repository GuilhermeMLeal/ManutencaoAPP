using Microsoft.EntityFrameworkCore;
using UserAuth.API.Extensions;
using UserAuth.Application.Interfaces;
using UserAuth.Application.Services;
using UserAuth.Domain.Interfaces;
using UserAuth.Infrastructure.Data;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using UserAuth.Infrastructure.Repositories;
using AuthUser.Infrastructure.Repositories;
using AuthUser.Domain.Interfaces;
using UserAuth.Infrastructure.Services;
using UserAuth.Domain.Entities;
using UserAuth.Application.Helpers;
using UserAuth.API.Validation.Controllers.Validation;

public class Startup
{
    private readonly IConfiguration _configuration;

    public Startup(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddDbContext<ApplicationDbContext>(
            options =>options.UseNpgsql(_configuration.GetConnectionString("DefaultConnection"))
        );

        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IRoleRepository, RoleRepository>();
        services.AddScoped<ISquadRepository, SquadRepository>(); 

        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IRoleService, RoleService>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<ISquadService, SquadService>();
        services.AddHttpClient();
        services.AddHttpContextAccessor();
        services.AddScoped<VerifyToken>();


        //services.AddCors(options =>
        //{
        //    options.AddPolicy("AllowAPIGateway",
        //        builder =>
        //        {
        //            builder.WithOrigins("http://localhost:3002") 
        //                .AllowAnyMethod()
        //                .AllowAnyHeader();
        //        });
        //});
        services.AddCors(options =>
        {
            options.AddPolicy("AllowAll",
                builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
        });

        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { 
                Title = "User Authentication API", 
                Version = "v1" });
            c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme() {
                Name = "Authorization",
                Type = SecuritySchemeType.ApiKey,
                Scheme = "Bearer",
                BearerFormat = "JWT",
                In = ParameterLocation.Header,
                Description = "JWT Authorization Header is using Bearer Schema " +
                              "\n\n Input 'Bearer' + token"
            });
            c.AddSecurityRequirement(new OpenApiSecurityRequirement() 
            {
                {
                    new OpenApiSecurityScheme 
                    {
                        Reference = new OpenApiReference 
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    Array.Empty<String>()
                }
            });
        });  

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = _configuration["Jwt:Issuer"],
                ValidAudience = _configuration["Jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]))
            };
        });
        services.AddAuthorization();

        services.AddSingleton<IConfiguration>(_configuration);

    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {

        //app.UseCors("AllowAPIGateway");
        app.UseCors("AllowAll");

        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
            
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "User Authentication API V1"); // Set up the Swagger UI
            c.RoutePrefix = string.Empty; // Set Swagger UI at the app's root
        });
        app.ApplyMigrations();

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

            // Seed de Users
            if (!context.Users.Any())
            {
                var user = new User
                {
                    Name = "Admin User",
                    Email = "admin@example.com",
                    Username = "admin",
                    Password = PasswordHelper.HashPassword("admin")
                };
                context.Users.Add(user);
                context.SaveChanges();
                Console.WriteLine("Usu�rio salvo.");
            }

            // Seed de Roles
            if (!context.Roles.Any())
            {
                var role = new Role
                {
                    Id = 1,
                    Name = "Admin 1"
                };
                context.Roles.Add(role);
                context.SaveChanges();
                Console.WriteLine("Role salva.");
            }

            // Relacionamento entre User e Role
            if (!context.UserRoles.Any())
            {
                var user = context.Users.FirstOrDefault(u => u.Username == "admin");
                var role = context.Roles.FirstOrDefault(r => r.Name == "Admin 1");

                if (user != null && role != null)
                {
                    context.UserRoles.Add(new UserRole
                    {
                        UserId = user.Id,
                        RoleId = role.Id
                    });
                    context.SaveChanges();
                    Console.WriteLine("Relacionamento User-Role salvo.");
                }
            }

            // Seed de Squads
            if (!context.Squads.Any())
            {
                var squad = new UserAuth.Domain.Entities.Squad
                {
                    Name = "Manutencao 1",
                    Description = "Manuten��o no Place 1"
                };
                context.Squads.Add(squad);
                context.SaveChanges();
                Console.WriteLine("Squad salvo.");
            }

            //Relacionamento entre User e Squad
            if (!context.UserSquads.Any())
            {
                var user = context.Users.FirstOrDefault(u => u.Username == "admin");
                var squad = context.Squads.FirstOrDefault(s => s.Name == "Manutencao 1");

                if (user != null && squad != null)
                {
                    context.UserSquads.Add(new UserSquad
                    {
                        UserId = user.Id,
                        SquadId = squad.Id
                    });
                    context.SaveChanges();
                    Console.WriteLine("Relacionamento User-Squad salvo.");
                }
                else
                {
                    Console.WriteLine("Erro: Usu�rio ou Squad n�o encontrado.");
                }
            }
        }


    }

}
