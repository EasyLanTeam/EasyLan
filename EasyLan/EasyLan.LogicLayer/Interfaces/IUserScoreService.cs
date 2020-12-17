using EasyLan.LogicLayer.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace EasyLan.LogicLayer.Interfaces
{
    public interface IUserScoreService
    {
        Task CreateAsync(UserScoreDTO userScore);
        Task DeleteAsync(UserScoreDTO userScore);
        Task<UserScoreDTO> ReadAsync(Guid userScoreId);
        Task<int> GetSumScore(string userId);
        Task UpdateAsync(UserScoreDTO userScore);
        Task<List<UserScoreDTO>> ReadAllAsync();
    }
}
