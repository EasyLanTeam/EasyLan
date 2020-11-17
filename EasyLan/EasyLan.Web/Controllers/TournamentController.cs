using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using EasyLan.LogicLayer.DTOs;
using EasyLan.LogicLayer.Interfaces;
using EasyLan.Web.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EasyLan.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TournamentController : ControllerBase
    {
        ITournamentService tournamentService;

        private MapperConfiguration config = new MapperConfiguration(cfg => {
            cfg.CreateMap<TournamentViewModel, TournamentDTO>();
            cfg.CreateMap<TournamentDTO, TournamentViewModel>();
            cfg.CreateMap<LocationViewModel, LocationDTO>();
            cfg.CreateMap<LocationDTO, LocationViewModel>();
            cfg.CreateMap<UserViewModel, UserDTO>();
            cfg.CreateMap<UserDTO, UserViewModel>();
        });
        public TournamentController(ITournamentService tournamentService)
        {
            this.tournamentService = tournamentService;
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
            return new JsonResult(mapper.Map<TournamentDTO, TournamentViewModel>(tournament));
        }

        // POST api/<TournamentController>
        [HttpPost]
        public void Post([FromBody] TournamentViewModel tournament)
        {
            var mapper = config.CreateMapper();
            tournamentService.Create(mapper.Map<TournamentViewModel, TournamentDTO>(tournament));
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
    }
}
