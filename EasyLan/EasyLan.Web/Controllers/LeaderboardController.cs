using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using EasyLan.LogicLayer.DTOs;
using EasyLan.LogicLayer.Interfaces;
using EasyLan.Web.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EasyLan.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaderboardController : ControllerBase
    {
        private MapperConfiguration config = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<UserScoreModel, UserScoreDTO>();
            cfg.CreateMap<UserScoreDTO, UserScoreModel>();
            cfg.CreateMap<UserViewModel, UserDTO>();
            cfg.CreateMap<UserDTO, UserViewModel>();
        });

        private ILeaderboardService leaderboardService;

        public LeaderboardController(ILeaderboardService leaderboardService)
        {
            this.leaderboardService = leaderboardService;
        }

        // GET: api/<LeaderboardController>
        [HttpGet("{region}")]
        public async Task<IEnumerable<UserScoreModel>> Get(string region)
        {
            var mapper = config.CreateMapper();
            var leaderboard = await leaderboardService.GetTop20Async(region);
            return mapper.Map<List<UserScoreDTO>, List<UserScoreModel>>(leaderboard);
        }
    }
}
