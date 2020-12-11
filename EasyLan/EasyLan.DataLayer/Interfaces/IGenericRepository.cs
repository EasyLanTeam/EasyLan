using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace EasyLan.DataLayer.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        T Find(Guid id);
        T Find(params object[] keyValues);
        List<T> Get(int count, int pageNumber);
        List<T> Get(int count, int pageNumber, Func<T, bool> predicate);
        List<T> Get(Func<T, bool> predicate);
        T Create(T entity);
        void Remove(T entitu);
        void Update(T entity);
        List<T> GetWithInclude(params Expression<Func<T, object>>[] includeProperties);
        List<T> ReadAll();
    }
}
