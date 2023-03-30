using BookStore.BusinessLogic.Services.Interfaces;
using BookStore.DataAccess.Models;
using BookStore.DataAccess.Repositoris.Interfaces;

namespace BookStore.BusinessLogic.Services
{
    public class ProductService : IProductService
    {
        private IProductRepository _product;

        public ProductService (IProductRepository product)
        {
            _product = product;
        }


        public async Task Create(Product product)
        {
          await _product.Create(product);
        }

        public Task Delete(Product product)
        {
            throw new NotImplementedException();
        }

        public Task<Product> FindId(string id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Product>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task Update(Product product)
        {
            throw new NotImplementedException();
        }
    }
}