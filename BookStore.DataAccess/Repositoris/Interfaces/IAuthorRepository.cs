using BookStore.DataAccess.Models;

namespace BookStore.DataAccess.Repositoris.Interfaces
{
    public interface IAuthorRepository: IGenericRepository<Author>
    {
        Task<List<Author>> ListGetAll();
        Task<List<Author>> GetAllActive();
    }
}