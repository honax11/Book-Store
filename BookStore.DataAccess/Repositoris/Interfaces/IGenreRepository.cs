using BookStore.DataAccess.Models;

namespace BookStore.DataAccess.Repositoris.Interfaces
{
    public interface IGenreRepository: IGenericRepository<Ganre>
    {
        Task <List<Ganre>> ListGanreId (List<string> ids);
       
    }
}