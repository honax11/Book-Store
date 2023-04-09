
using BookStore.BusinessLogic.Views;
using BookStore.DataAccess.Models;

namespace BookStore.BusinessLogic.Services
{
    public interface IGanreService
    {
        Task Create (CreateGanreView view);
        Task Delete (string id);
        Task <Ganre> FindId (string id);
        Task Update (UpdateGanreView view);
        Task<IEnumerable<Ganre>> GetAll();
    }
}