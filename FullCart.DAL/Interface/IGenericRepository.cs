using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FullCart.DAL.Interface
{
    public interface IGenericRepository<T> where T : class, new()
    {
        Task<T> Get(Expression<Func<T, bool>> filter = null);
        Task<List<T>> GetList(Expression<Func<T, bool>> filter = null);
        Task<T> UpdateAsync(T updated);

        Task<T> AddAsync(T inserted);

        Task<T> DeleteAsync(T deleted);
    }
}
