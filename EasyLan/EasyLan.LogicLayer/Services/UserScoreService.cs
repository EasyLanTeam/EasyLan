using AutoMapper;
using EasyLan.DataLayer.Entites;
using EasyLan.DataLayer.Interfaces;
using EasyLan.LogicLayer.DTOs;
using EasyLan.LogicLayer.Interfaces;
using System;
using System.Collections.Generic;

namespace EasyLan.LogicLayer.Services
{
    internal class UserScoreService : IUserScoreService
    {
        private MapperConfiguration config = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<UserScore, UserScoreDTO>();
            cfg.CreateMap<UserScoreDTO, UserScore>();
            cfg.CreateMap<User, UserDTO>();
            cfg.CreateMap<UserDTO, User>();
        });

        private IGenericRepository<UserScore> repository;

        public UserScoreService(IGenericRepository<UserScore> repository)
        {
            this.repository = repository;
        }

        public void Create(UserScoreDTO userScore)
        {
            var mapper = config.CreateMapper();
            repository.Create(mapper.Map<UserScoreDTO, UserScore>(userScore));
        }

        public UserScoreDTO Read(Guid userScoreId)
        {
            var mapper = config.CreateMapper();
            var userScore = repository.Find(userScoreId);
            return mapper.Map<UserScoreDTO>(userScore);
        }

        public List<UserScoreDTO> ReadAll()
        {
            var mapper = config.CreateMapper();
            var userScore = repository.ReadAll();
            return mapper.Map<List<UserScoreDTO>>(userScore);
        }

        public void Update(UserScoreDTO userScore)
        {
            var mapper = config.CreateMapper();
            repository.Create(mapper.Map<UserScoreDTO, UserScore>(userScore));
        }

        public void Delete(UserScoreDTO userScore)
        {
            var mapper = config.CreateMapper();
            repository.Remove(mapper.Map<UserScore>(userScore));
        }
    }
}
