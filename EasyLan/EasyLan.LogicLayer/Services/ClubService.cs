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
    public class ClubService : IClubService
    {
        IGenericRepository<ClubRequest> clubRequestRepository;

        private MapperConfiguration config = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<ClubRequestDTO, ClubRequest>();
            cfg.CreateMap<ClubRequest, ClubRequestDTO>();

        });

        public ClubService(IGenericRepository<ClubRequest> clubRequestRepository)
        {
            this.clubRequestRepository = clubRequestRepository; 
        }

        public void Create(ClubRequestDTO clubRequestDTO)
        {
            var mapper = config.CreateMapper();
            clubRequestRepository.Create(mapper.Map<ClubRequestDTO, ClubRequest>(clubRequestDTO));
        }
    }
}
