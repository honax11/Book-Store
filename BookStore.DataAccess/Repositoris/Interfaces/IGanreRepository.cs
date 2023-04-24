using BookStore.DataAccess.Models;

namespace BookStore.DataAccess.Repositoris.Interfaces
{
    public interface IGanreRepository: IGenericRepository<Ganre>
    {
        Task <List<Ganre>> ListGanreId(List<string> ids);
    }
}