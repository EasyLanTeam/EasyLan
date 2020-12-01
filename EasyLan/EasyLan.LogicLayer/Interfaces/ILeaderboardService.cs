using EasyLan.LogicLayer.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace EasyLan.LogicLayer.Interfaces
{
    public interface ILeaderboardService
    {
        List<UserScoreDTO> GetTop(string region, int count);
        List<UserScoreDTO> GetTop20(string region);
    }
}
