using EasyLan.DataLayer.Entites;
using EasyLan.DataLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace EasyLan.DataLayer
{
    public class UserRepository : IUserRepository
    {
        private AppDbContext db;

        public UserRepository(AppDbContext dbContext)
        {
            db = dbContext;
        }

        public IEnumerable<User> Get()
        {
            return db.Users.ToList();
        }

        public User Get(string username)
        {
            return db.Users.FirstOrDefault(u => u.Username.Equals(username));
        }

        public User Get(Guid id)
        {
            return db.Users.Find(id);
        }

        public void Create(User user)
        {
            user.Id = Guid.NewGuid();
            db.Users.Add(user);
        }

        public void Remove(User user)
        {
            db.Users.Remove(user);
        }

        public void SaveChanges()
        {
            db.SaveChanges();
        }
    }
}
