using EasyLan.DataLayer.Entites;
using System;
using System.Collections.Generic;

namespace EasyLan.DataLayer.Interfaces
{
    public interface IUserRepository
    {
        IEnumerable<User> Get();
        User Get(Guid id);
        User Get(string username);
        void Create(User user);
        void Remove(User user);
    }
}
