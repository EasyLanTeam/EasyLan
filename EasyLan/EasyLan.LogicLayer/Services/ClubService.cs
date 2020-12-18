using AutoMapper;
using EasyLan.DataLayer.Entites;
using EasyLan.DataLayer.Interfaces;
using EasyLan.LogicLayer.DTOs;
using EasyLan.LogicLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
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
        public ClubRequestDTO Find(Guid id)
        {
            var mapper = config.CreateMapper();
            return mapper.Map<ClubRequest, ClubRequestDTO>(clubRequestRepository.Find(id));
        }
        public List<ClubRequestDTO> Get()
        {
            var mapper = config.CreateMapper();
            return clubRequestRepository.Get(p=> p.Status == Status.Proccessing).Select(p => mapper.Map<ClubRequest, ClubRequestDTO>(p)).ToList();
        }

        public void MarkAsApplyed(Guid id)
        {
            var request = clubRequestRepository.Find(id);
            if (request == null)
                return;
            request.IsCompleted = true;
            request.Status = Status.Proccesed;
        }

        public void Create(ClubRequestDTO clubRequestDTO)
        {
            var mapper = config.CreateMapper();
            clubRequestRepository.Create(mapper.Map<ClubRequestDTO, ClubRequest>(clubRequestDTO));
        }
    }
}
