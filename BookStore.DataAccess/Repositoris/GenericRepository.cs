using BookStore.DataAccess.Data;
using BookStore.DataAccess.Models;
using BookStore.DataAccess.Repositoris.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BookStore.DataAccess.Repositoris
{
    public abstract class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : BaseEntity
    {
        protected DataContext _context;
        protected DbSet<TEntity> _dbSet;

        public GenericRepository (DataContext context)
        {
            _context = context;
            _dbSet = context.Set<TEntity>();

        }
        public async Task Create(TEntity item)
        {
            _dbSet.Add(item);
            await _context.SaveChangesAsync();
            
        }

        public async Task Delete(TEntity item)
        {
            _dbSet.Remove(item);
            await _context.SaveChangesAsync();
        }

        public async Task<TEntity> FindId(string id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<IEnumerable<TEntity>> GetAll()
        {
            return await _dbSet.AsNoTracking().ToListAsync();
        }

        public async Task Update(TEntity item)
        {
            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}