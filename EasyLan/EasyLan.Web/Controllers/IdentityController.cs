using EasyLan.LogicLayer.Interfaces;
using EasyLan.Web.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace EasyLan.Web.Controllers
{
    public class AuthOptions
    {
        public const string ISSUER = "MyAuthServer";
        public const string AUDIENCE = "MyAuthClient";
        const string KEY = "mysupersecret_secretkey!123";
        public const int LIFETIME = 60;
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
    [Route("api/[controller]")]
    [ApiController]
    public class IdentityController : ControllerBase
    {

        IUserService userService;
        public IdentityController(IUserService userServ)
        {
            userService = userServ;
        }
        [HttpPost]
        public IActionResult Token([FromBody] IdentityViewModel model)
        {
            var identity = GetIdentity(model.Username, model.Password);
            if (identity == null)
            {
                return Unauthorized();
            }
            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                notBefore: now,
                claims: identity.Claims,
                expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            HttpContext.Response.Cookies.Append(".AspNetCore.Application.Kel", encodedJwt,
                new CookieOptions
                {
                    MaxAge = TimeSpan.FromMinutes(60)
                });
            return Ok();

        }

        private ClaimsIdentity GetIdentity(string userName, string password)
        {
            ClaimsIdentity identity = null;
            var user = userService.GetUser(userName);
            if (user != null)
            {
                var sha256 = new SHA256Managed();
                var passwordHash = Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(password)));
                if (passwordHash == user.Password)
                {
                    var claims = new List<Claim>
                    {
                        new Claim(ClaimsIdentity.DefaultNameClaimType, user.Username),
                    };
                    identity = new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
                }
            }
            return identity;
        }

    }
}
