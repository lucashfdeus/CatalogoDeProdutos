using Asp.Versioning;
using LHFD.CatalogoDeProdutos.Api.Extensions;
using LHFD.CatalogoDeProdutos.Business.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace LHFD.CatalogoDeProdutos.Api.Controllers
{
    [ApiVersion("1.0")]
    public class AuthController : MainController
    {

        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly AppSettings _appSettings;

        public AuthController(UserManager<IdentityUser> userManager,
                              SignInManager<IdentityUser> signInManager,
                              IOptions<AppSettings> appSettings)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _appSettings = appSettings.Value;
        }

        [HttpPost("nova-conta")]
        public async Task<IActionResult> Register(RegisterUserDto model)
        {
            var user = new IdentityUser
            {
                UserName = model.Email,
                Email = model.Email,
                EmailConfirmed = true
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(await GenerateJwt(model.Email));
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginUserDto model)
        {
            var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, true);

            if (!result.Succeeded)
                return Unauthorized("Usuário ou senha inválidos");

            return Ok(await GenerateJwt(model.Email));
        }

        private async Task<object> GenerateJwt(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user is null)
                return Unauthorized("Usuário não encontrado");

            if(string.IsNullOrEmpty(user.Email))
                return Unauthorized("Usuário não possui email associado");

            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);

            var tokenHandler = new JwtSecurityTokenHandler();

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Email, user.Email) }),
                Expires = DateTime.UtcNow.AddHours(_appSettings.ExpiracaoHoras),
                Issuer = _appSettings.Emissor,
                Audience = _appSettings.ValidoEm,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return new
            {
                accessToken = tokenHandler.WriteToken(token),
                expiresIn = TimeSpan.FromHours(_appSettings.ExpiracaoHoras).TotalSeconds
            };
        }
    }
}
