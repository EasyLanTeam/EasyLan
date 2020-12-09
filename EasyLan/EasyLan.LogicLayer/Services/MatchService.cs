using AutoMapper;
using EasyLan.DataLayer.Entites;
using EasyLan.DataLayer.Interfaces;
using EasyLan.LogicLayer.DTOs;
using EasyLan.LogicLayer.Interfaces;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using EasyLan.LogicLayer.Utils;
using Match = EasyLan.DataLayer.Entites.Match;

namespace EasyLan.LogicLayer.Services
{
    public class MatchService : IMatchService
    {
        private IGenericRepository<Tournament> tournamentRepository;
        private IGenericRepository<Match> matchRepository;
        private readonly UserManager<IdentityUser> userManager;

        private MapperConfiguration config = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<Match, MatchDTO>();
            cfg.CreateMap<MatchDTO, Match>();
        });

        public MatchService(IGenericRepository<Tournament> tournamnetRepository,
            IGenericRepository<Match> matchRepository,
            UserManager<IdentityUser> userManager)
        {
            this.matchRepository = matchRepository;
            this.tournamentRepository = tournamnetRepository;
            this.userManager = userManager;
        }

        public void InitilizeFirstMatches(Guid tournamentId)
        {
            var tournament = tournamentRepository.GetWithInclude(t => t.Players)
                .FirstOrDefault(t => t.TournamentId == tournamentId);
            if (tournament == null)
                return;

            var players = tournament.Players;
            var finalMatch = Bracket.Create(players);
            var queue = new Queue<MatchNode>();
            queue.Enqueue(finalMatch);
            while (queue.Count > 0)
            {
                var currentMatchNode = queue.Dequeue();
                var match = currentMatchNode.Match;
                match.TournamentId = tournamentId;

                if (currentMatchNode.NextMatchNode != null)
                {
                    match.NextMatchId = currentMatchNode.NextMatchNode.Match.MatchId;
                }

                currentMatchNode.Match = matchRepository.Create(match);

                if (currentMatchNode.PrevLeftMatchNode != null)
                {
                    queue.Enqueue(currentMatchNode.PrevLeftMatchNode);
                }

                if (currentMatchNode.PrevRightMatchNode != null)
                {
                    queue.Enqueue(currentMatchNode.PrevRightMatchNode);
                }
            }
        }

        public void SetWinner(Guid matchId, string userId)
        {
            var match = matchRepository.Find(matchId);
            if (match == null)
                return;
            if (userManager.FindByIdAsync(userId).Result == null)
                return;
            match.WinnerId = userId;
            matchRepository.Update(match);
        }

        public void CreateNext(Guid firstMatchId, Guid secondMatchId)
        {
            var firstMatch = matchRepository.Find(firstMatchId);
            var secondMatch = matchRepository.Find(secondMatchId);
            if (firstMatch == null || secondMatch == null)
                return;
            if (firstMatch.Level != secondMatch.Level)
                return;

            matchRepository.Create(new Match
            {
                TournamentId = firstMatch.TournamentId,
                Level = firstMatch.Level + 1,
                FirstPlayerId = firstMatch.WinnerId,
                SecondPlayerId = secondMatch.WinnerId,
                NavNumber = firstMatch.NavNumber * secondMatch.NavNumber
            });
        }

        public List<List<MatchDTO>> Get(Guid tournamentId)
        {
            var mapper = config.CreateMapper();
            var matches = matchRepository.GetWithInclude(p => p.FirstPlayer, p => p.SecondPlayer, p => p.Winner)
                .Where(p => p.TournamentId == tournamentId);
            var result = new List<List<MatchDTO>>();
            var levelCount = 1;
            int count;
            do
            {
                count = matches.Count(p => p.Level == levelCount);
                var filteredMatches = matches.Where(p => p.Level == levelCount).ToList();
                result.Add(mapper.Map<List<Match>, List<MatchDTO>>(filteredMatches));
                levelCount++;
            } while (count > 0);

            return result;
        }
    }
}