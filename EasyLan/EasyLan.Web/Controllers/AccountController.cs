using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using EasyLan.DataLayer;
using EasyLan.DataLayer.Entites;
using EasyLan.LogicLayer.Interfaces;
using EasyLan.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EasyLan.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly SignInManager<IdentityUser> signInManager;
        private AppDbContext dbContext;
        private readonly IUserScoreService _userScoreService;
        private readonly IPlayerProfileService _playerProfile;
        private MapperConfiguration _mapper = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<PlayerProfile, PlayerProfileModel>();
            cfg.CreateMap<PlayerProfileModel, PlayerProfile>();
        });

        //private IHttpContextAccessor httpContextAccessor;


        public AccountController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager,
            AppDbContext dbContext, IUserScoreService userScoreService, IPlayerProfileService playerProfile)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.dbContext = dbContext;
            _userScoreService = userScoreService ?? throw new ArgumentNullException(nameof(userScoreService));
            _playerProfile = playerProfile;
            //this.httpContextAccessor = httpContextAccessor;
        }

        [HttpGet]
        public async Task<IActionResult> GetOwnUserData()
        {
            var user = await userManager.GetUserAsync(User);
            if (user == null)
                return Unauthorized();
            
            var userData = new UserDataViewModel    
            {
                Id = user.Id,
                Username = user.UserName,
            };
            var userRole = userManager.GetRolesAsync(user).Result.FirstOrDefault();
            userData.Email = user.Email;
            userData.Role = userRole;

            return new JsonResult(userData);
        }


        [HttpGet("[action]")]
        public async Task<IActionResult> GetUserData(string id)
        {
            var userFromDb = dbContext.Users.FirstOrDefault(u => u.Id == id);
            if (userFromDb == null)
                return NotFound();

            var userData = new UserDataViewModel
            {
                Id = userFromDb.Id,
                Username = userFromDb.UserName,
            };

            var userScore = _userScoreService.GetSumScore(id);
            var currentUser = await userManager.GetUserAsync(User);
            if (currentUser != null && currentUser.Id == userFromDb.Id)
            {
                var userRole = await userManager.GetRolesAsync(currentUser).ContinueWith(x => x.Result.FirstOrDefault());
                userData.Email = userFromDb.Email;
                userData.Role = userRole;
            }
            userData.Score = await userScore.ConfigureAwait(false);
            return new JsonResult(userData);
        }

        private async Task LoadSampleUsers()
        {
            int v = dbContext.Users.Count();
            if (v < 10)
            {
                string file = System.IO.File.ReadAllText("MockData\\mock-users-1000.json");
                var users = JsonConvert.DeserializeObject<List<dynamic>>(file);
                foreach (var user in users.Take(128))
                {
                    var newUser = new IdentityUser(user.Username.ToString()) { Email = user.ToString() };
                    var result = await userManager.CreateAsync(newUser, user.Password.ToString());

                    if (result.Succeeded)
                    {
                        await userManager.AddToRoleAsync(newUser, "user");
                    }
                }
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Create([FromBody] RegistrationViewModel registrationViewModel)
        {
            var userFromDb = dbContext.Users.FirstOrDefault(u => u.UserName == registrationViewModel.Username);
            if (userFromDb != null)
                return BadRequest("Такой Login уже зарегистрирован");
            var newUser = new IdentityUser(registrationViewModel.Username) {Email = registrationViewModel.Email};
            var result = await userManager.CreateAsync(newUser, registrationViewModel.Password);

            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(newUser, "user");

                PlayerProfile profileEntity = new PlayerProfile { Player = newUser };
                await _playerProfile.Create(profileEntity).ConfigureAwait(false);

                return Ok();
            }

            return BadRequest();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> CreateUsersFromMockData()
        {
            await LoadSampleUsers();

            return Ok();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Login(string userLogin, string userPassword, bool rememberUser)
        {
            var user = dbContext.Users.FirstOrDefault(u => u.UserName == userLogin);
            if (user == null)
                return Unauthorized();
            var result = await signInManager.PasswordSignInAsync(user.UserName, userPassword, rememberUser, false);
            if (result.Succeeded)
            {
                var userRole = userManager.GetRolesAsync(user).Result.FirstOrDefault();
                var userData = new UserDataViewModel
                {
                    Id = user.Id,
                    Username = user.UserName,
                    Email = user.Email,
                    Role = userRole
                };
                return new JsonResult(userData);
            }

            return Unauthorized();
        }

        [HttpPost("[action]")]
        public IActionResult LogoutUser()
        {
            var result = signInManager.SignOutAsync();
            if (result.IsCompletedSuccessfully)
                return Ok();
            return BadRequest();
        }

        [HttpPut("[action]")]
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