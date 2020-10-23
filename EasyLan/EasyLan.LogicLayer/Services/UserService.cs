using AutoMapper;
using EasyLan.DataLayer.Entites;
using EasyLan.DataLayer.Interfaces;
using EasyLan.LogicLayer.DTOs;
using EasyLan.LogicLayer.Interfaces;
using System;
using System.Collections.Generic;

namespace EasyLan.LogicLayer.Services
{
    public class UserService : IUserService
    {
        private IUserRepository db;
        private MapperConfiguration config = new MapperConfiguration(cfg => {
            cfg.CreateMap<User, UserDTO>();
            cfg.CreateMap<UserDTO, User>();
        });

        public UserService(IUserRepository userRepository)
        {
            db = userRepository;
        }

        public IEnumerable<UserDTO> FindAll()
        {
            var mapper = config.CreateMapper();
            var users = db.Get();
            return mapper.Map<IEnumerable<User>, IEnumerable<UserDTO>>(users);
        }

        public UserDTO GetUser(string username)
        {
            var mapper = config.CreateMapper();
            var user = db.Get(username);
            return mapper.Map<User, UserDTO>(user);
        }

        public UserDTO GetById(Guid id)
        {
            var mapper = config.CreateMapper();
            var user = db.Get(id);
            return mapper.Map<User, UserDTO>(user);
        }

        public void Add(UserDTO userDTO)
        {
            var mapper = config.CreateMapper();
            db.Create(mapper.Map<UserDTO, User>(userDTO));
        }
        public void Remove(UserDTO userDTO)
        {

        }
        public void SaveChanges()
        {
            db.SaveChanges();
        }
    }
}
