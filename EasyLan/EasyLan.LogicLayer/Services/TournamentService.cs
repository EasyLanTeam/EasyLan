using AutoMapper;
using EasyLan.DataLayer.Entites;
using EasyLan.DataLayer.Interfaces;
using EasyLan.LogicLayer.DTOs;
using EasyLan.LogicLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace EasyLan.LogicLayer.Services
{
    public class TournamentService : ITournamentService
    {
        private IGenericRepository<Tournament> repository;
        private MapperConfiguration config = new MapperConfiguration(cfg => {
            cfg.CreateMap<Tournament, TournamentDTO>();
            cfg.CreateMap<TournamentDTO, Tournament>();
            cfg.CreateMap<Location, LocationDTO>();
            cfg.CreateMap<LocationDTO, Location>();
            cfg.CreateMap<User, UserDTO>();
            cfg.CreateMap<UserDTO, User>();
        });

        public TournamentService(IGenericRepository<Tournament> repository)
        {
            this.repository = repository;
        }

        public List<TournamentDTO> Get(int count, int page)
        {
            var mapper = config.CreateMapper();
            var tournaments = repository.Get(count, page);
            return mapper.Map<List<Tournament>, List<TournamentDTO>>(tournaments);
        }

        public TournamentDTO Find(Guid id)
        {
            var mapper = config.CreateMapper();
            var tournament = repository.Find(id);
            return mapper.Map<Tournament, TournamentDTO>(tournament);
        }

        public void Create(TournamentDTO tournamentDTO)
        {
            var mapper = config.CreateMapper();
            repository.Create(mapper.Map<TournamentDTO, Tournament>(tournamentDTO));
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
    }
}
