using EasyLan.LogicLayer.DTOs;
using System;
using System.Collections.Generic;

namespace EasyLan.LogicLayer.Interfaces
{
    public interface IUserService
    {
        UserDTO GetUser(string username);
        UserDTO GetById(Guid id);
        IEnumerable<UserDTO> FindAll();
        void Add(UserDTO userDTO);
        void Remove(UserDTO userDTO);
        void SaveChanges();
    }
}
