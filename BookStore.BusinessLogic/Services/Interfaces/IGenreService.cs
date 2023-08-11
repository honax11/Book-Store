
using BookStore.BusinessLogic.Views;
using BookStore.DataAccess.Models;

namespace BookStore.BusinessLogic.Services
{
    public interface IGenreService
    {
        Task Create (CreateGenreView view);
        Task Delete (string id);
        Task <Genre> FindId (string id);
        Task Update (UpdateGenreView view);
        Task<IEnumerable<Genre>> GetAll();
    }
}