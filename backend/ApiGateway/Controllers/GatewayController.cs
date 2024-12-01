using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

[ApiController]
[Route("api/[controller]")]
public class GatewayController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _configuration;

    public GatewayController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
    {
        _httpClientFactory = httpClientFactory;
        _configuration = configuration;
    }

    // Redireciona para obter todas as ferramentas
    [HttpGet("tools")]
    public async Task<IActionResult> GetAllTools()
    {
        if (!await ValidateToken()) return Unauthorized("Token inválido ou expirado.");
        return await ForwardRequest("http://toolapi:8080/api/tool", HttpMethod.Get);
    }

    // Redireciona para obter uma ferramenta pelo ID
    [HttpGet("tools/{id}")]
    public async Task<IActionResult> GetToolById(int id)
    {
        if (!await ValidateToken()) return Unauthorized("Token inválido ou expirado.");
        return await ForwardRequest($"http://toolapi:8080/api/tool/{id}", HttpMethod.Get);
    }

    // Redireciona para adicionar uma nova ferramenta
    [HttpPost("tools")]
    public async Task<IActionResult> AddTool([FromBody] object toolData)
    {
        if (!await ValidateToken()) return Unauthorized("Token inválido ou expirado.");
        return await ForwardRequest("http://toolapi:8080/api/tool", HttpMethod.Post, toolData);
    }

    // Redireciona para atualizar uma ferramenta
    [HttpPut("tools")]
    public async Task<IActionResult> UpdateTool([FromBody] object toolData)
    {
        if (!await ValidateToken()) return Unauthorized("Token inválido ou expirado.");
        return await ForwardRequest("http://toolapi:8080/api/tool", HttpMethod.Put, toolData);
    }

    // Redireciona para deletar uma ferramenta pelo ID
    [HttpDelete("tools/{id}")]
    public async Task<IActionResult> DeleteTool(int id)
    {
        if (!await ValidateToken()) return Unauthorized("Token inválido ou expirado.");
        return await ForwardRequest($"http://toolapi:8080/api/tool/{id}", HttpMethod.Delete);
    }

    // Método auxiliar para redirecionar requisições
    private async Task<IActionResult> ForwardRequest(string url, HttpMethod method, object body = null)
    {
        var client = _httpClientFactory.CreateClient();

        var request = new HttpRequestMessage(method, url);

        // Adiciona o corpo da requisição se necessário
        if (body != null)
        {
            var jsonContent = JsonSerializer.Serialize(body);
            request.Content = new StringContent(jsonContent, Encoding.UTF8, "application/json");
        }

        // Adiciona o cabeçalho de autorização, se disponível
        var authHeader = Request.Headers["Authorization"].ToString();
        if (!string.IsNullOrEmpty(authHeader))
        {
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", authHeader.Substring("Bearer ".Length).Trim());
        }

        // Envia a requisição ao microsserviço
        var response = await client.SendAsync(request);

        var responseContent = await response.Content.ReadAsStringAsync();

        return StatusCode((int)response.StatusCode, responseContent);
    }

    // Método para validar o token
    private async Task<bool> ValidateToken()
    {
        var authHeader = Request.Headers["Authorization"].ToString();

        if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
        {
            return false;
        }

        var token = authHeader.Substring("Bearer ".Length).Trim();

        var client = _httpClientFactory.CreateClient();
        client.BaseAddress = new Uri("http://userapi:8080"); // URL do AuthAPI
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

        
        var response = await client.GetAsync("/api/auth/validate-token");
        Console.WriteLine(response);
        return response.IsSuccessStatusCode;
    }
}
