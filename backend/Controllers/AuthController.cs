using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore; // Ez kell az .Include() használatához
using backend.Data;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;

        public AuthController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        public class LoginDto
        {
            public string Email { get; set; } = string.Empty;
            public string Jelszo { get; set; } = string.Empty;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginData)
        {
            string hashedInputPassword = backend.Helper.PasswordHasher.HashPassword(loginData.Jelszo);

            var user = await _context.Felhasznalok
                .Include(u => u.Oktato)
                    .ThenInclude(o => o.Szak)
                .FirstOrDefaultAsync(u => u.Email == loginData.Email && u.Jelszo == hashedInputPassword);

            if (user == null)
            {
                return Unauthorized(new { message = "Hibás email vagy jelszó!" });
            }

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim("FelhasznaloId", user.Id.ToString()),
                new Claim(ClaimTypes.Role, user.OktatoId == null ? "Admin" : "Oktato")
            };


            if (user.Oktato != null)
            {
                claims.Add(new Claim("OktatoId", user.OktatoId.ToString()!));
                claims.Add(new Claim("OktatoNev", user.Oktato.Nev));
                claims.Add(new Claim("SzakId", user.Oktato.SzakId.ToString()));

                if (user.Oktato.Szak != null)
                {
                    claims.Add(new Claim("SzakNev", user.Oktato.Szak.Nev));
                }
            }

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: credentials);

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                felhasznalo = new
                {
                    email = user.Email,
                    szerepkor = user.OktatoId == null ? "Admin" : "Oktato",
                    oktatoNev = user.Oktato?.Nev,
                    szakNev = user.Oktato?.Szak?.Nev
                }
            });
        }
    }
}