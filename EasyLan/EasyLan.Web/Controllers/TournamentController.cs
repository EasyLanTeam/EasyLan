using AutoMapper;
using EasyLan.LogicLayer.DTOs;
using EasyLan.LogicLayer.Interfaces;
using EasyLan.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EasyLan.DataLayer;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EasyLan.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TournamentController : ControllerBase
    {
        ITournamentService tournamentService;
        IMatchService matchService;
        private readonly AppDbContext dbContext;
        UserManager<IdentityUser> userManager;

        private MapperConfiguration config = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<TournamentViewModel, TournamentDTO>();
            cfg.CreateMap<TournamentDTO, TournamentViewModel>();
            cfg.CreateMap<LocationViewModel, LocationDTO>();
            cfg.CreateMap<LocationDTO, LocationViewModel>();
            cfg.CreateMap<UserViewModel, UserDTO>();
            cfg.CreateMap<UserDTO, UserViewModel>();
            cfg.CreateMap<PrizeViewModel, PrizeDTO>();
            cfg.CreateMap<PrizeDTO, PrizeViewModel>();
        });

        public TournamentController(ITournamentService tournamentService, UserManager<IdentityUser> userManager,
            IMatchService matchService, AppDbContext dbContext)
        {
            this.tournamentService = tournamentService;
            this.userManager = userManager;
            this.matchService = matchService;
            this.dbContext = dbContext;
        }

        // GET: api/<TournamentController>
        [HttpGet]
        public IEnumerable<TournamentViewModel> Get([FromQuery] PagingParameters pagingParameters)
        {
            var mapper = config.CreateMapper();
            var tournaments = tournamentService.Get(pagingParameters.PageSize, pagingParameters.PageNumber);
            return mapper.Map<List<TournamentDTO>, List<TournamentViewModel>>(tournaments);
        }

        // GET api/<TournamentController>/5
        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            var mapper = config.CreateMapper();
            var tournament = tournamentService.Find(id);
            if (tournament == null)
                return NotFound();
            var tournamentViewModel = mapper.Map<TournamentDTO, TournamentViewModel>(tournament);
            tournamentViewModel.Prizes = mapper.Map<List<PrizeDTO>, List<PrizeViewModel>>(tournament.Prizes);
            return new JsonResult(tournamentViewModel);
        }

        // POST api/<TournamentController>
        [HttpPost]
        [Authorize]
        public void Post([FromBody] TournamentViewModel tournament)
        {
            var mapper = config.CreateMapper();
            var tournamentDto = mapper.Map<TournamentViewModel, TournamentDTO>(tournament);
            tournamentDto.Prizes = mapper.Map<List<PrizeViewModel>, List<PrizeDTO>>(tournament.Prizes);
            var user = userManager.GetUserAsync(User).Result;

            tournamentDto.Initiator = user.UserName;
            tournamentService.Create(tournamentDto);
        }

        // PUT api/<TournamentController>/5
        [HttpPut("{id}")]
        public IActionResult Put([FromBody] TournamentViewModel tournament)
        {
            if (tournamentService.Find(tournament.TournamentId) == null)
                return NotFound();
            var mapper = config.CreateMapper();
            tournamentService.Update(mapper.Map<TournamentViewModel, TournamentDTO>(tournament));
            return Ok();
        }

        // DELETE api/<TournamentController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var tournament = tournamentService.Find(id);
            if (tournament == null)
                return NotFound();
            tournamentService.Remove(tournament);
            return Ok();
        }

        [Authorize]
        [HttpPost("[action]/{id}")]
        public void TakePart(Guid id)
        {
            var user = userManager.GetUserAsync(User).Result;
            tournamentService.AddUserToTournament(user.Id, id);
        }
        
        [Authorize]
        [HttpPost("[action]/{id}")]
        public void UndoTakePart(Guid id)
        {
            var user = userManager.GetUserAsync(User).Result;
            tournamentService.RemoveUserFromTournament(user.Id, id);
        }
        
        
        /// <summary>
        /// Для удобства при разработке
        /// </summary>
        /// <param name="id"></param>
        /// <param name="userId"></param>
        [HttpPost("[action]/{id}")]
        public void AddUserToTournament(Guid id, string userId)
        {
            tournamentService.AddUserToTournament(userId, id);
        }

        [HttpPost("[action]/{id}")]
        public async Task<IActionResult> SetMultipleUsersToTournament(Guid id, [FromQuery] int count = 8)
        {
            var tournament = tournamentService.Find(id);
            dbContext.Matches.RemoveRange(await dbContext.Matches.Where(m => m.TournamentId == id).ToArrayAsync());
            dbContext.PlayerTournaments.RemoveRange(await dbContext.PlayerTournaments.Where(m => m.TournamentId == id).ToArrayAsync());
            await dbContext.SaveChangesAsync();

            var users = await dbContext.Users
                .Skip(10)
                .Take(count)
                .Where(u => u.Id != tournament.InitiatorId)
                .ToListAsync();

            foreach (var user in users)
            {
                AddUserToTournament(id, user.Id);
            }

            return Ok();
        }

        [HttpPost("[action]/{id}")]
        public IActionResult Start(Guid id)
        {
            tournamentService.Start(id);
            return Ok();
        }
    }
}