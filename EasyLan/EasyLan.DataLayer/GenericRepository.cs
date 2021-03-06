﻿using EasyLan.DataLayer.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace EasyLan.DataLayer
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        AppDbContext dbContext { get; set; }
        DbSet<T> dbSet { get; set; }
        public GenericRepository(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
            dbSet = dbContext.Set<T>();
        }

        public List<T> ReadAll()
        {
            return dbSet.ToList();
        }

        public List<T> Get(int count, int pageNumber)
        {
            return dbSet.Skip((pageNumber - 1) * count).Take(count).ToList();
        }

        public List<T> Get(int count, int pageNumber, Func<T, bool> predicate)
        {
            return dbSet.Skip((pageNumber - 1)* count).Take(count).Where(predicate).ToList();
        }
        public List<T> Get(Func<T, bool> predicate)
        {
            return dbSet.Where(predicate).ToList();
        }
        public T Find(Guid guid)
        {
            return dbSet.Find(guid);
        }
        public T Find(params object[] keyValues)
        {
            return dbSet.Find(keyValues);
        }

        public T Create(T entity)
        {
            var createdEntity = dbSet.Add(entity);
            dbContext.SaveChanges();

            return createdEntity.Entity;
        }

        public void Update(T entity)
        {
            dbContext.Entry(entity).State = EntityState.Modified;
            dbContext.SaveChanges();
        }

        public void Remove(T entity)
        {
            dbSet.Remove(entity);
            dbContext.SaveChanges();
        }

        public List<T> GetPageWithInclude(int count, int pageNumber, Func<T, bool> predicate, 
            params Expression<Func<T, object>>[] includeProperties)
        {
            return Include(includeProperties)
                .Skip((pageNumber - 1)* count)
                .Take(count)
                .Where(predicate)
                .ToList();
        }
        
        public List<T> GetPageWithInclude(int count, int pageNumber,
            params Expression<Func<T, object>>[] includeProperties)
        {
            return Include(includeProperties)
                .Skip((pageNumber - 1)* count)
                .Take(count)
                .ToList();
        }
        
        public List<T> GetWithInclude(Func<T, bool> predicate, params Expression<Func<T, object>>[] includeProperties)
        {
            return Include(includeProperties)
                .Where(predicate)
                .ToList();
        }
        
        public List<T> GetWithInclude(params Expression<Func<T, object>>[] includeProperties)
        {
            return Include(includeProperties).ToList();
        }

        private IQueryable<T> Include(params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = dbSet.AsNoTracking();
            return includeProperties
                .Aggregate(query, (current, includeProperty) => current.Include(includeProperty));
        }
    }
}
