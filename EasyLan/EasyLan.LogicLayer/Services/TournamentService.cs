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
        private readonly IGenericRepository<UserScore> userScoreRepository;
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
            cfg.CreateMap<PlayerTournament, PlayerTournamentDTO>();
            cfg.CreateMap<PlayerTournamentDTO, PlayerTournament>();
        });

        public TournamentService(IGenericRepository<Tournament> repository, IGenericRepository<Match> matchRepository,
            UserManager<IdentityUser> userManager, IGenericRepository<PlayerTournament> playerTournamentRepository,
            IGenericRepository<UserScore> userScoreRepository,
            IMatchService matchService)
        {
            this.repository = repository;
            this.matchRepository = matchRepository;
            this.userManager = userManager;
            this.playerTournamentRepository = playerTournamentRepository;
            this.userScoreRepository = userScoreRepository;
            this.matchService = matchService;
        }

        public List<TournamentDTO> Get(int count, int page)
        {
            var mapper = config.CreateMapper();
            var tournaments = repository.GetPageWithInclude(count, page, t => t.Prizes, t => t.Players);
            return tournaments
                .Select(tournament =>
                {
                    var tournamentDto = mapper.Map<Tournament, TournamentDTO>(tournament);
                    tournamentDto.CurrentNumberOfParticipants = tournament.Players.Count();
                    tournamentDto.Prizes = mapper.Map<List<Prize>, List<PrizeDTO>>(tournament.Prizes);

                    return tournamentDto;
                }).ToList();
        }

        public TournamentDTO Find(Guid id)
        {
            var mapper = config.CreateMapper();
            var tournament = repository.GetWithInclude(t => t.Prizes, t => t.Players)
                .FirstOrDefault(p => p.TournamentId == id);
            if (tournament == null)
                return null;
            var tournamentDto = mapper.Map<Tournament, TournamentDTO>(tournament);
            tournamentDto.CurrentNumberOfParticipants = tournament.Players.Count();
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
            var tournament = repository.Find(tournamentId);
            if (tournament == null)
                throw new Exception($"don't find tournament with id: {tournamentId}");
            if (tournament.TournamentState != TournamentState.Pending)
                throw new Exception($"tournament already started");

            playerTournamentRepository.Create(new PlayerTournament {TournamentId = tournamentId, UserId = userId});
        }

        public void RemoveUserFromTournament(string userId, Guid tournamentId)
        {
            if (userManager.FindByIdAsync(userId).Result == null)
                return;
            var tournament = repository.Find(tournamentId);
            if (tournament == null)
                throw new Exception($"don't find tournament with id: {tournamentId}");
            if (tournament.TournamentState != TournamentState.Pending)
                throw new Exception($"tournament already started");

            var playerTournament = playerTournamentRepository.Find(tournamentId, userId);
            playerTournamentRepository.Remove(playerTournament);
        }

        public List<PlayerTournamentDTO> GetAllPlayersFromTournament(Guid tournamentId)
        {
            var mapper = config.CreateMapper();
            var tournament = repository.Find(tournamentId);
            if (tournament == null)
                throw new Exception($"don't find tournament with id: {tournamentId}");

            var players = playerTournamentRepository.GetWithInclude(p => p.TournamentId == tournamentId, p => p.User);

            return players.Select(p =>
            {
                var playerDto = mapper.Map<PlayerTournament, PlayerTournamentDTO>(p);
                playerDto.Username = p.User.UserName;

                return playerDto;
            }).ToList();
        }

        public void Start(Guid id)
        {
            var tournament = repository.Find(id);
            if (tournament == null)
                throw new Exception($"don't find tournament with id: {id}");
            if (tournament.TournamentState != TournamentState.Pending)
                throw new Exception($"tournament already started");

            matchService.InitilizeFirstMatches(id);
            tournament.TournamentState = TournamentState.Ongoing;
            repository.Update(tournament);
        }

        public void Finish(Guid id)
        {
            var tournament = repository.Find(id);
            if (tournament == null)
                throw new Exception($"don't find tournament with id: {id}");
            if (tournament.TournamentState == TournamentState.Pending)
                throw new Exception($"tournament was not started");
            if (tournament.TournamentState == TournamentState.Finished)
                throw new Exception($"tournament already finished");

            var matches = matchService.Get(id).SelectMany(m => m).ToList();
            var maxLevelMatch = matches.Max(m => m.Level);
            var finalMatch = matches.Find(m => m.Level == maxLevelMatch);
            if (finalMatch?.WinnerId == null)
                throw new Exception($"final match winner has not setted");

            var existInUserScorePlayers = userScoreRepository.ReadAll();

            // Подсчитываем изменения в score для каждого игрока
            // и Создаем/Обновляем записи о игроках в userScore
            var playersInTournament = playerTournamentRepository.Get(p => p.TournamentId == id);
            playersInTournament.ForEach(player =>
            {
                var winsCount = matches.Count(m => m.WinnerId == player.UserId);
                player.ScoreDelta = 100 * winsCount + (finalMatch.WinnerId == player.UserId ? 500 : 0);

                var userScoreEntry = existInUserScorePlayers.FirstOrDefault(u => u.UserId == player.UserId);
                if (userScoreEntry == null)
                    userScoreRepository.Create(new UserScore
                        {Score = player.ScoreDelta, UserId = player.UserId, Region = "ekb"});
                else
                {
                    player.ScoreInMoment = userScoreEntry.Score;
                    userScoreEntry.Score += player.ScoreDelta;
                    userScoreRepository.Update(userScoreEntry);
                }

                playerTournamentRepository.Update(player);
            });

            // Обновляем информацию о score
            tournament.TournamentState = TournamentState.Finished;
            repository.Update(tournament);
        }
    }
}