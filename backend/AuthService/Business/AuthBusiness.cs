using AuthService.Business.Interfaces;
using AuthService.Services.Interfaces;
using AuthService.Repository.Interfaces;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using AuthService.Models.Refresh;

namespace AuthService.Business
{
    public class AuthBusiness : IAuthBusiness
    {
        private readonly ITokenService _tokenService;
        private readonly IRefreshTokenRepository _refreshTokenRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AuthBusiness(ITokenService tokenService, IRefreshTokenRepository refreshTokenRepository, IHttpContextAccessor httpContextAccessor)
        {
            _tokenService = tokenService ?? throw new ArgumentNullException(nameof(tokenService));
            _refreshTokenRepository = refreshTokenRepository ?? throw new ArgumentNullException(nameof(refreshTokenRepository));
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<(string AccessToken, string RefreshToken)> LoginAsync(string username, string password)
        {
            ValidateCredentials(username, password);

            var claims = GenerateUserClaims(username);

            // Gerar tokens
            var accessToken = _tokenService.GenerateAccessToken(claims);
            var refreshToken = _tokenService.GenerateRefreshToken();

            // Criar e salvar o modelo de Refresh Token
            var refreshTokenModel = CreateRefreshTokenModel(username, refreshToken, accessToken);
            await _refreshTokenRepository.SaveRefreshTokenAsync(refreshTokenModel);

            return (accessToken, refreshToken);
        }

        public async Task<(string AccessToken, string RefreshToken)> RefreshAsync(string userId, string refreshToken)
        {
            // Validação delegada ao TokenService
            var isValid = await _tokenService.ValidateRefreshTokenAsync(userId, refreshToken);
            if (!isValid)
            {
                throw new UnauthorizedAccessException("Invalid or expired refresh token.");
            }

            var claims = GenerateUserClaims(userId);

            // Gerar novo Access Token e Refresh Token
            var newAccessToken = _tokenService.GenerateAccessToken(claims);
            var newRefreshToken = _tokenService.GenerateRefreshToken();

            // Atualizar o Refresh Token no repositório
            await SaveNewRefreshToken(userId, newRefreshToken, newAccessToken);

            // Revogar o Refresh Token antigo
            await _refreshTokenRepository.RevokeRefreshTokenAsync(userId, refreshToken);

            return (newAccessToken, newRefreshToken);
        }

        public async Task LoginCookieAsync(string username, string password)
        {
            ValidateCredentials(username, password);

            var claims = GenerateUserClaims(username);

            // Gerar tokens
            var accessToken = _tokenService.GenerateAccessToken(claims);
            var refreshToken = _tokenService.GenerateRefreshToken();

            // Criar e salvar o modelo de Refresh Token
            var refreshTokenModel = CreateRefreshTokenModel(username, refreshToken, accessToken);
            await _refreshTokenRepository.SaveRefreshTokenAsync(refreshTokenModel);

            DateTime expiresAccessToken = GetExpiresAccessToken(accessToken);
            DateTime expiresRefreshToken = expiresAccessToken.AddMinutes(30);

            // Configura os cookies
            SetTokenCookie("access_token", accessToken, expiresAccessToken);
            SetTokenCookie("refresh_token", refreshToken, expiresRefreshToken);
        }

        public async Task RefreshCookieAsync(string userId, string refreshToken)
        {
            // Validação delegada ao TokenService
            var isValid = await _tokenService.ValidateRefreshTokenAsync(userId, refreshToken);
            if (!isValid)
            {
                throw new UnauthorizedAccessException("Invalid or expired refresh token.");
            }

            var claims = GenerateUserClaims(userId);

            // Gerar novo Access Token e Refresh Token
            var newAccessToken = _tokenService.GenerateAccessToken(claims);
            var newRefreshToken = _tokenService.GenerateRefreshToken();

            // Atualizar o Refresh Token no repositório
            await SaveNewRefreshToken(userId, newRefreshToken, newAccessToken);

            // Revogar o Refresh Token antigo
            await _refreshTokenRepository.RevokeRefreshTokenAsync(userId, refreshToken);

            DateTime expiresAccessToken = GetExpiresAccessToken(newAccessToken);
            DateTime expiresRefreshToken = expiresAccessToken.AddMinutes(30);

            // Configura os cookies
            SetTokenCookie("access_token", newAccessToken, expiresAccessToken);
            SetTokenCookie("refresh_token", refreshToken, expiresRefreshToken);
        }

        private void ValidateCredentials(string username, string password)
        {
            if (username != "testuser" || password != "testpassword")
            {
                throw new UnauthorizedAccessException("Invalid credentials");
            }
        }

        private IEnumerable<Claim> GenerateUserClaims(string userId)
        {
            return new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Role, "User")
            };
        }

        private RefreshTokenModel CreateRefreshTokenModel(string userId, string refreshToken, string accessToken)
        {
            return new RefreshTokenModel
            {
                UserId = userId,
                Token = refreshToken,
                Expiration = GenerateExpiresRefreshToken(accessToken)
            };
        }

        private async Task SaveNewRefreshToken(string userId, string newRefreshToken, string newAccessToken)
        {
            var newRefreshTokenModel = CreateRefreshTokenModel(userId, newRefreshToken, newAccessToken);
            await _refreshTokenRepository.SaveRefreshTokenAsync(newRefreshTokenModel);
        }

        private void SetTokenCookie(string key, string token, DateTime expires)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true, // Protege contra ataques XSS
                Secure = true, // Requer HTTPS
                SameSite = SameSiteMode.Strict, // Protege contra CSRF
                Expires = expires // Usa o tempo de expiração especificado
            };

            // Adiciona o cookie à resposta HTTP
            _httpContextAccessor.HttpContext?.Response.Cookies.Append(key, token, cookieOptions);
        }
        private DateTime GenerateExpiresRefreshToken(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);

            var expClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Exp);
            if (expClaim == null)
            {
                throw new InvalidOperationException("The token does not contain an 'exp' claim.");
            }

            // Converte o timestamp Unix para DateTime
            var expUnix = long.Parse(expClaim.Value);
            DateTime expires = DateTimeOffset.FromUnixTimeSeconds(expUnix).UtcDateTime.AddMinutes(30);

            return expires;
        }
        private DateTime GetExpiresAccessToken(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);

            var expClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Exp);
            if (expClaim == null)
            {
                throw new InvalidOperationException("The token does not contain an 'exp' claim.");
            }

            // Converte o timestamp Unix para DateTime
            var expUnix = long.Parse(expClaim.Value);
            DateTime expires = DateTimeOffset.FromUnixTimeSeconds(expUnix).UtcDateTime;

            return expires;
        }
    }
}
