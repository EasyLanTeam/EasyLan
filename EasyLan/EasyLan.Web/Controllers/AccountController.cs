using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using EasyLan.DataLayer;
using EasyLan.Web.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EasyLan.Web.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly SignInManager<IdentityUser> signInManager;
        private AppDbContext dbContext;


        //private IHttpContextAccessor httpContextAccessor;


        public AccountController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, AppDbContext dbContext)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.dbContext = dbContext;
            //this.httpContextAccessor = httpContextAccessor;
        }
        [HttpPost]
        public IActionResult Create([FromBody] RegistrationViewModel registrationViewModel)
        {

            var userFomDb = dbContext.Users.FirstOrDefault(u => u.UserName == registrationViewModel.Username);
            if (userFomDb != null)
                return BadRequest("Такой Login уже зарегистрирован");

            var result = userManager.CreateAsync(new IdentityUser(registrationViewModel.Username), registrationViewModel.Password);
            if (result.Result.Succeeded)
                return Ok();
            return BadRequest();
        }
        [HttpPost]
        public IActionResult Login(string userLogin, string userPassword, bool rememberUser)
        {
            var user = dbContext.Users.FirstOrDefault(u => u.UserName == userLogin);
            if (user == null)
                return Unauthorized();
            var result = Task.Run(() => signInManager.PasswordSignInAsync(user.UserName, userPassword, rememberUser, false));
            if (result.Result.Succeeded)
            {
                return Ok();
            }
            return Unauthorized();
        }
        [HttpPost]
        public IActionResult LogoutUser()
        {
            var result = signInManager.SignOutAsync();
            if (result.IsCompletedSuccessfully)
                return Ok();
            return BadRequest();
        }

        [HttpPut]
        public IActionResult ChangePassword(string newPassword, string oldPassword)
        {
            var userFromManager = userManager.GetUserAsync(User).Result;
            var result = userManager.ChangePasswordAsync(userFromManager, oldPassword, newPassword).Result;
            if (result.Succeeded)
                return Ok();
            return Unauthorized();
        }
    }
}
