using EasyLan.LogicLayer.DTOs;
using EasyLan.LogicLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace EasyLan.LogicLayer.Services
{
    class LeaderboardService : ILeaderboardService
    {
        private IUserScoreService userScoreService;

        public LeaderboardService(IUserScoreService userScoreService)
        {
            this.userScoreService = userScoreService;
        }

        public List<UserScoreDTO> GetTop20(string region)
        {
            return userScoreService.ReadAll().Where(x => x.Region == region).OrderByDescending(x => x.Score).Take(20).ToList();
        }

        public List<UserScoreDTO> GetTop(string region, int count)
        {
            return userScoreService.ReadAll().Where(x => x.Region == region).OrderByDescending(x => x.Score).Take(count).ToList();
        }
    }
}
