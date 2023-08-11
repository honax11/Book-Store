using BookStore.DataAccess.Models;

namespace BookStore.DataAccess.Repositoris.Interfaces
{
    public interface IGenreRepository: IGenericRepository<Genre>
    {
        Task <List<Genre>> ListGanreId (List<string> ids);
       
    }
}