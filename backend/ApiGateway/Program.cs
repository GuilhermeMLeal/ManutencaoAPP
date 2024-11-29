using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Configuração de autenticação JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer("JwtBearer", options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "emissor",
            ValidAudience = "destinatario",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("CLyuqWAaoBZIFSzkfworDetPz4YinvqG"))
        };
    });

// Adiciona suporte a controladores e endpoints
builder.Services.AddControllers();
builder.Services.AddHttpClient(); // Adiciona suporte para chamadas HTTP

// Configuração do Swagger para documentação
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "API Gateway",
        Version = "v1",
        Description = "API Gateway para rotear requisições para as APIs downstream"
    });

    // Configuração de segurança para JWT
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Insira o token JWT no formato: Bearer {seu token}",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
            },
            new string[] {}
        }
    });
});

var app = builder.Build();

// Configuração do Swagger
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "API Gateway");
    c.RoutePrefix = string.Empty; // Define o Swagger na raiz
});

// Middleware de autenticação e autorização
app.UseAuthentication();
app.UseAuthorization();

// Configuração dos endpoints dos controladores
app.MapControllers();

// Inicializa o aplicativo
app.Run();
