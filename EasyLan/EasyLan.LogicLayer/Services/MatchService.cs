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

                if (currentMatchNode.NextMatchNode != null)
                {
                    var nextMatchNode = currentMatchNode.NextMatchNode;
                    if (currentMatchNode == nextMatchNode.PrevLeftMatchNode)
                    {
                        nextMatchNode.Match.PrevFirstMatchId = currentMatchNode.Match.MatchId;
                    }
                    else if (currentMatchNode == nextMatchNode.PrevRightMatchNode)
                    {
                        nextMatchNode.Match.PrevSecondMatchId = currentMatchNode.Match.MatchId;
                    }

                    matchRepository.Update(nextMatchNode.Match);
                }

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
                throw new ArgumentNullException("match");
            if (userId != null && userManager.FindByIdAsync(userId).Result == null)
                throw new ArgumentException($"user not found by id: {userId}");
            match.WinnerId = userId;

            if (match.NextMatchId != null)
            {
                var nextMatch = matchRepository.Find(match.NextMatchId.Value);
                if (nextMatch.WinnerId != null)
                {
                    throw new Exception("next Match winner don't be setted");
                }

                if (match.MatchId == nextMatch.PrevFirstMatchId)
                {
                    nextMatch.FirstPlayerId = userId;
                }
                else if (match.MatchId == nextMatch.PrevSecondMatchId)
                {
                    nextMatch.SecondPlayerId = userId;
                }

                matchRepository.Update(nextMatch);
            }

            matchRepository.Update(match);
        }

        public List<List<MatchDTO>> Get(Guid tournamentId)
        {
            var mapper = config.CreateMapper();
            var matches = matchRepository.GetWithInclude(p => p.FirstPlayer, p => p.SecondPlayer, p => p.Winner)
                .Where(p => p.TournamentId == tournamentId);

            var result = matches
                .GroupBy(m => m.Level)
                .OrderBy(mGroup => mGroup.Key)
                .Select(mList => mapper.Map<List<Match>, List<MatchDTO>>(mList.ToList()))
                .ToList();

            return result;
        }
    }
}