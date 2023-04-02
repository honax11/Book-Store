using BookStore.BusinessLogic.Views;
using BookStore.DataAccess.Models;

namespace BookStore.BusinessLogic.Services.Interfaces
{
    public interface IProductService
    {
        Task Create (CreateProductView view);
        Task Delete (CreateProductView view);
        Task <Product> FindId (string id);
        Task Update (CreateProductView view);
        Task<IEnumerable<Product>> GetAll();
    }
}