using BookStore.DataAccess.Models;

namespace BookStore.DataAccess.Repositoris.Interfaces
{
    public interface IProductRepository: IGenericRepository<Product>
    {
        Task<List<Product>> GetProductAll();
        Task <List<OrderItem>> GetProductsById();
    }
}