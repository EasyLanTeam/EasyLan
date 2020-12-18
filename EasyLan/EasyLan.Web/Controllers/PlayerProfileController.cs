using AutoMapper;
using EasyLan.DataLayer.Entites;
using EasyLan.LogicLayer.Interfaces;
using EasyLan.Web.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace EasyLan.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayerProfileController : ControllerBase
    {
        private readonly IPlayerProfileService _playerProfileService;
        private readonly UserManager<IdentityUser> _userManager;

        private MapperConfiguration _mapper = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<PlayerProfile, PlayerProfileModel>();
            cfg.CreateMap<PlayerProfileModel, PlayerProfile>();
        });

        public PlayerProfileController(IPlayerProfileService playerProfile, UserManager<IdentityUser> userManager)
        {
            _playerProfileService = playerProfile;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var user = await _userManager.GetUserAsync(User).ConfigureAwait(false);
            if (user == null)
                return Unauthorized();

            PlayerProfile profileEntity = await _playerProfileService.Read(user.Id).ConfigureAwait(false);
            var profile = _mapper.CreateMapper().Map<PlayerProfileModel>(profileEntity);
            profile.PlayerId = user.Id;

            return new JsonResult(profile);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] PlayerProfileModel playerProfile)
        {
            PlayerProfile profileEntity = _mapper.CreateMapper().Map<PlayerProfile>(playerProfile);
            await _playerProfileService.WeakUpdate(profileEntity).ConfigureAwait(false);
            return Ok();
        }
    }
}
