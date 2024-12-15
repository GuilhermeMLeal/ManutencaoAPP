using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Net.Http.Headers;
using System.Text.Json;

namespace MachineAPI.API.Controllers.Validation
{
    public class VerifyToken : ActionFilterAttribute
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _configuration;

        public VerifyToken(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClientFactory = httpClientFactory;
            _configuration = configuration;
        }

        public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var isValid = await VerifyTokenFunction(context);
            if (!isValid)
            {
                context.Result = new UnauthorizedObjectResult(new { message = "Invalid or expired token." });
                return;
            }

            await next();
        }

        private async Task<bool> VerifyTokenFunction(ActionExecutingContext context)
        {
            var request = context.HttpContext.Request;
            var authHeader = request.Headers["Authorization"].ToString();

            if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            {
                Console.WriteLine("Authorization header is missing or invalid.");
                return false;
            }

            var token = authHeader.Substring("Bearer ".Length).Trim();
            Console.WriteLine($"Extracted Token: {token}");

            try
            {
                var client = _httpClientFactory.CreateClient();
                client.BaseAddress = new Uri(_configuration["AuthService:BaseUrl"]); // URL do AuthAPI no appsettings.json
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                Console.WriteLine($"Making request to: {client.BaseAddress}/api/Auth/validate-token");
                var response = await client.GetAsync("/api/Auth/validate-token");

                Console.WriteLine($"Response Status Code: {response.StatusCode}");
                if (!response.IsSuccessStatusCode)
                {
                    var responseBody = await response.Content.ReadAsStringAsync();
                    Console.WriteLine($"Response Body: {responseBody}");
                }

                return response.IsSuccessStatusCode;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception occurred during token verification: {ex.Message}");
                return false;
            }
        }

    }
}
