using BookStore.DataAccess.Models;

namespace BookStore.BusinessLogic.Services.Interfaces
{
    public interface IProductService
    {
        Task Create (Product product);
        Task Delete (Product product);
        Task <Product> FindId (string id);
        Task Update (Product product);
        Task<IEnumerable<Product>> GetAll();
    }
}