using AutoMapper;
using AutoMapper.QueryableExtensions.Impl;
using EasyLan.DataLayer.Entites;
using EasyLan.DataLayer.Interfaces;
using EasyLan.LogicLayer.DTOs;
using EasyLan.LogicLayer.Interfaces;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;

namespace EasyLan.LogicLayer.Services
{
    public class TournamentService : ITournamentService
    {
        private IGenericRepository<Tournament> repository;
        private IGenericRepository<Match> matchRepository;
        private IGenericRepository<PlayerTournament> playerTournamentRepository;
        private readonly UserManager<IdentityUser> userManager;

        private IMatchService matchService;

        private MapperConfiguration config = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<Tournament, TournamentDTO>();
            cfg.CreateMap<TournamentDTO, Tournament>();
            cfg.CreateMap<Location, LocationDTO>();
            cfg.CreateMap<LocationDTO, Location>();
            cfg.CreateMap<Prize, PrizeDTO>();
            cfg.CreateMap<PrizeDTO, Prize>();
        });

        public TournamentService(IGenericRepository<Tournament> repository, IGenericRepository<Match> matchRepository, 
            UserManager<IdentityUser> userManager, IGenericRepository<PlayerTournament> playerTournamentRepository,
            IMatchService matchService)
        {
            this.repository = repository;
            this.matchRepository = matchRepository;
            this.userManager = userManager;
            this.playerTournamentRepository = playerTournamentRepository;
            this.matchService = matchService;
        }

        public List<TournamentDTO> Get(int count, int page)
        {
            var mapper = config.CreateMapper();
            var tournaments = repository.Get(count, page);
            return mapper.Map<List<Tournament>, List<TournamentDTO>>(tournaments);
        }

        public TournamentDTO Find(Guid id)
        {
            var mapper = config.CreateMapper();
            var tournament = repository.GetWithInclude(t => t.Prizes).FirstOrDefault(p => p.TournamentId == id);
            var tournamentDto = mapper.Map<Tournament, TournamentDTO>(tournament);
            tournamentDto.Prizes = mapper.Map<List<Prize>, List<PrizeDTO>>(tournament.Prizes);
            return tournamentDto;
        }

        public void Create(TournamentDTO tournamentDTO)
        {
            var mapper = config.CreateMapper();
            var tournament = mapper.Map<TournamentDTO, Tournament>(tournamentDTO);
            tournament.Prizes = mapper.Map<List<PrizeDTO>, List<Prize>>(tournamentDTO.Prizes);
            repository.Create(tournament);
        }
        public void Remove(TournamentDTO tournamentDTO)
        {
            var mapper = config.CreateMapper();
            repository.Remove(mapper.Map<TournamentDTO, Tournament>(tournamentDTO));
        }

        public void Update(TournamentDTO tournamentDTO)
        {
            var mapper = config.CreateMapper();
            repository.Create(mapper.Map<TournamentDTO, Tournament>(tournamentDTO));
        }

        public void AddUserToTournament(string userId, Guid tournamentId)
        {
            if (userManager.FindByIdAsync(userId).Result == null)
                return;
            if (repository.Find(tournamentId) == null)
                return;
            playerTournamentRepository.Create(new PlayerTournament { TournamentId = tournamentId, UserId = userId });
        }

        public void Start(Guid id)
        {
            matchService.InitilizeFirstMatches(id);
        }
    }
}
