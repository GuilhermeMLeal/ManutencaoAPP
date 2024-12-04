using Microsoft.AspNetCore.Mvc;
using UserAuth.API.Controllers.Validation;
using UserAuth.API.DTOs;
using UserAuth.Application.Helpers;
using UserAuth.Application.Interfaces;
using UserAuth.Application.Services;

namespace UserAuth.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ITokenService _tokenService;

        public AuthController(IAuthService authService, ITokenService tokenService)
        {
            _authService = authService;
            _tokenService = tokenService;
        }

        [HttpPost]
        public async Task<IActionResult> LoginUser(UserLoginDTO userLoginDTO)
        {
            var userDTO = await _authService.LoginUser(userLoginDTO);
            if (userDTO == null)
                return Unauthorized("Invalid Credentials");

            var token = _tokenService.GenerateToken(userDTO);
            return Ok(token);
        }

        [HttpPost("refresh-token")]
        public IActionResult RefreshToken()
        {
            var authorizationHeader = Request.Headers["Authorization"].ToString();
            Console.Write(authorizationHeader);
            var newToken = _tokenService.RefreshToken(authorizationHeader);

            if (newToken == null)
            {
                return Unauthorized("Token invalid or expired.");
            }

            return Ok(newToken);
        }

        [HttpGet("validate-token")]
        public IActionResult ValidateToken()
        {
            var authHeader = Request.Headers["Authorization"].ToString();
            if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
                return Unauthorized("Token não fornecido ou inválido.");

            var token = authHeader.Substring("Bearer ".Length).Trim();
            var isValid = _tokenService.ValidateToken(token);

            if (!isValid)
                return Unauthorized("Token inválido ou expirado.");

            return Ok("Token válido.");
        }



    }
}
