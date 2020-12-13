using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EasyLan.LogicLayer.DTOs;
using EasyLan.LogicLayer.Interfaces;
using EasyLan.Web.Mappers;
using EasyLan.Web.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EasyLan.Web.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MatchController : ControllerBase
    {
        private IMatchService matchService;
        public MatchController(IMatchService matchService)
        {
            this.matchService = matchService;
        }
        /// <summary>
        /// передается id турнира
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public List<MathesLevelViewModel> GetMatches(Guid id)
        {
            var matchDtos = matchService.Get(id);
            var result = new List<MathesLevelViewModel>();
            matchDtos.ForEach(list => {
                var matchesLevel = new MathesLevelViewModel();
                matchesLevel.Matches = list.Select(MatchMapper.Map).ToList();
                matchesLevel.LevelNumber = (int)matchesLevel.Matches.FirstOrDefault()?.Level;
            });
            return result;
        }       

        [HttpPost]
        public void SetWinner(Guid matchId, string userId)
        {
            matchService.SetWinner(matchId, userId);
        }

        [HttpPost]
        public void CreateNext(Guid firstMatchId, Guid secondMatchId)
        {
            matchService.CreateNext(firstMatchId, secondMatchId);
        }

    }
}