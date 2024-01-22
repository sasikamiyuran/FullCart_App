using FullCart.DAL.Context;
using FullCart.DAL.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FullCart.DAL.Repository
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class, new()
    {
        private readonly ApplicationDbContext _context;
        public GenericRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<TEntity> Get(Expression<Func<TEntity, bool>> filter = null)
        {
            return await _context.Set<TEntity>().FirstOrDefaultAsync(filter);
        }

        public async Task<List<TEntity>> GetList(Expression<Func<TEntity, bool>> filter = null)
        {
            return await (filter == null ? _context.Set<TEntity>().ToListAsync() : _context.Set<TEntity>().Where(filter).ToListAsync());
        }

        public async Task<TEntity> GetById(int Id)
        {
            return  _context.Set<TEntity>().Find(Id);
        }

        public async Task<TEntity> UpdateAsync(TEntity updated)
        {
            if (updated == null)
            {
                return null;
            }

            _context.Set<TEntity>().Attach(updated);
            _context.Entry(updated).State = EntityState.Modified;
            _context.SaveChanges();
            return updated;
        }

        public async Task<TEntity> AddAsync(TEntity inserted)
        {
            if (inserted == null)
            {
                return null;
            }

            _context.Set<TEntity>().Attach(inserted);
            _context.Entry(inserted).State = EntityState.Added;
            _context.SaveChanges();
            return inserted;
        }

        public async Task<TEntity> DeleteAsync(TEntity deleted)
        {
            if (deleted == null)
            {
                return null;
            }

            _context.Set<TEntity>().Remove(deleted);
            _context.Entry(deleted).State = EntityState.Deleted;
            _context.SaveChanges();
            return deleted;
        }

        public TEntity Delete(TEntity deleted)
        {
            throw new NotImplementedException();
        }
    }
}
