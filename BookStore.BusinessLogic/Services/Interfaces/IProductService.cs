using BookStore.BusinessLogic.Views;
using BookStore.DataAccess.Models;

namespace BookStore.BusinessLogic.Services.Interfaces
{
    public interface IProductService
    {
        Task Create (CreateProductView view);
        Task Delete (string id);
        Task <Product> FindId (string id);
        Task Update ();
        Task<IEnumerable<Product>> GetAll();
    }
}