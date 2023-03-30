using BookStore.DataAccess.Models;

namespace BookStore.DataAccess.Repositoris.Interfaces
{
    public interface IGenericRepository<TEntity> where TEntity : BaseEntity
    {
        Task Create (TEntity item);
        Task Update (TEntity item);
        Task Delete (TEntity item);
        Task <TEntity> FindId (string id);
        Task <IEnumerable<TEntity>> GetAll();

        
    }
}