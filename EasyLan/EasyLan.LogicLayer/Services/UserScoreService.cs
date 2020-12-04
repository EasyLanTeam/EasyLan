using AutoMapper;
using EasyLan.DataLayer;
using EasyLan.DataLayer.Entites;
using EasyLan.DataLayer.Interfaces;
using EasyLan.LogicLayer.DTOs;
using EasyLan.LogicLayer.Interfaces;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyLan.LogicLayer.Services
{
    public class UserScoreService : IUserScoreService
    {
        private MapperConfiguration config = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<UserScore, UserScoreDTO>();
            cfg.CreateMap<UserScoreDTO, UserScore>();
            cfg.CreateMap<User, UserDTO>();
            cfg.CreateMap<UserDTO, User>();
        });

        private IGenericRepository<UserScore> repository;
        private readonly AppDbContext appDbContext;

        public UserScoreService(IGenericRepository<UserScore> repository, AppDbContext appDbContext)
        {
            this.repository = repository;
            this.appDbContext = appDbContext;
        }

        public async Task CreateAsync(UserScoreDTO userScore)
        {
            var mapper = config.CreateMapper();
            repository.Create(mapper.Map<UserScoreDTO, UserScore>(userScore));
        }

        public async Task<UserScoreDTO> ReadAsync(Guid userScoreId)
        {
            await LoadSampleScores();
            var mapper = config.CreateMapper();
            var userScore = repository.Find(userScoreId);
            return mapper.Map<UserScoreDTO>(userScore);
        }

        public async Task<List<UserScoreDTO>> ReadAllAsync()
        {
            await LoadSampleScores();
            var mapper = config.CreateMapper();
            var userScore = repository.ReadAll();
            return mapper.Map<List<UserScoreDTO>>(userScore);
        }

        private async Task LoadSampleScores()
        {
            if (appDbContext.UserScores.Count() == 0)
            {
                var file = System.IO.File.ReadAllText("MockData\\mock-scores-100.json");
                IEnumerable<UserScore> scores = JsonConvert.DeserializeObject<List<UserScore>>(file);
                scores = scores.Zip(appDbContext.Users, (score, user) => { score.User = user; return score; });
                await appDbContext.UserScores.AddRangeAsync(scores).ConfigureAwait(false);
                await appDbContext.SaveChangesAsync().ConfigureAwait(false);
            }
        }

        public async Task UpdateAsync(UserScoreDTO userScore)
        {
            var mapper = config.CreateMapper();
            repository.Create(mapper.Map<UserScoreDTO, UserScore>(userScore));
        }

        public async Task DeleteAsync(UserScoreDTO userScore)
        {
            var mapper = config.CreateMapper();
            repository.Remove(mapper.Map<UserScore>(userScore));
        }
    }
}
