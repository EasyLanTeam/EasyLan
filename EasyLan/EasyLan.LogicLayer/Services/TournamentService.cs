using AutoMapper;
using EasyLan.DataLayer.Entites;
using EasyLan.DataLayer.Interfaces;
using EasyLan.LogicLayer.DTOs;
using EasyLan.LogicLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

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
            cfg.CreateMap<Prize, PrizeDTO>();
            cfg.CreateMap<PrizeDTO, Prize>();
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
            var tournament = repository.GetWithInclude(t => t.Prizes).FirstOrDefault(p => p.TournamentId == id);
            var tournamentDto = mapper.Map<Tournament, TournamentDTO>(tournament);
            tournamentDto.Prizes = mapper.Map<List<Prize>, List<PrizeDTO>>(tournament.Prizes);
            return tournamentDto;
        }

        public void Create(TournamentDTO tournamentDTO)
        {
            var mapper = config.CreateMapper();
            var tournament = mapper.Map<TournamentDTO, Tournament>(tournamentDTO);
            tournament.Prizes = mapper.Map<List<PrizeDTO>, List<Prize>>(tournamentDTO.Prizes);
            repository.Create(tournament);
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
