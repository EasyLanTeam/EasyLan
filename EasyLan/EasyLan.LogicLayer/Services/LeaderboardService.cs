﻿using EasyLan.LogicLayer.DTOs;
using EasyLan.LogicLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyLan.LogicLayer.Services
{
    public class LeaderboardService : ILeaderboardService
    {
        private IUserScoreService userScoreService;

        public LeaderboardService(IUserScoreService userScoreService)
        {
            this.userScoreService = userScoreService;
        }

        public async Task<List<UserScoreDTO>> GetTop20Async(string region)
        {
            return (await userScoreService.ReadAllAsync()).Where(x => x.Region == region).OrderByDescending(x => x.Score).Take(20).ToList();
        }

        public async Task<List<UserScoreDTO>> GetTopAsync(string region, int count)
        {
            return (await userScoreService.ReadAllAsync()).Where(x => x.Region == region).OrderByDescending(x => x.Score).Take(count).ToList();
        }

        public async Task<List<UserScoreDTO>> GetAllTotals()
        {
            return await userScoreService.ReadAllAsync().ContinueWith(x =>
                x.Result.GroupBy(x => x.User.Id).Select(x => x.Aggregate((a, b) => new UserScoreDTO { Region = "total", Score = a.Score + b.Score, User = a.User }))
                .ToList()).ConfigureAwait(false);
        }
    }
}
