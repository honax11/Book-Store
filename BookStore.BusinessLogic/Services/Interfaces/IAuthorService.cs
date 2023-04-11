using BookStore.BusinessLogic.Views;
using BookStore.DataAccess.Models;

namespace BookStore.BusinessLogic.Services.Interfaces
{
    public interface IAuthorService
    {
        Task Create (CreateAuthorView view);
        Task Delete (string id);
        Task <Author> FindId (string id);
        Task Update (UpdateAuthorView view);
        Task<IEnumerable<Author>> GetAll();
    }
}