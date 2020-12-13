using EasyLan.LogicLayer.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace EasyLan.LogicLayer.Interfaces
{
    public interface ILeaderboardService
    {
        Task<List<UserScoreDTO>> GetTopAsync(string region, int count);
        Task<List<UserScoreDTO>> GetTop20Async(string region);
    }
}
