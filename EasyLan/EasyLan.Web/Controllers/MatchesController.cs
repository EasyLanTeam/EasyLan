using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EasyLan.LogicLayer.DTOs;
using EasyLan.LogicLayer.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EasyLan.Web.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MatchesController : ControllerBase
    {
        private IMatchService matchService;
        public MatchesController(IMatchService matchService)
        {
            this.matchService = matchService;
        }
        /// <summary>
        /// передается id турнира
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public List<List<MatchDTO>> GetMatches(Guid id)
        {
            return matchService.Get(id);
        }

        [HttpPost]
        public void SetWiiner(Guid matchId, string userId)
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