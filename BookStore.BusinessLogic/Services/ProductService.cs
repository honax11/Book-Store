using BookStore.BusinessLogic.Services.Interfaces;
using BookStore.BusinessLogic.Views;
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


        public async Task Create(CreateProductView view)
        {
            if (view == null)
            {
                throw new Exception ("Product not create");
            }

            var product = new Product();
            product.Author = view.Author;
            product.AuthorId =view.AuthorId;
            product.CreationDate = view.CreationDate;
            product.Description = view.Description;
            product.Ganre = view.Ganre;
            product.GanreId = view.GanreId;
            product.Id = view.Id;
            product.IsActive = view.IsActive;
            product.IsDeleted = view.IsDeleted;
            product.Name = view.Name;
            product.Price = view.Price;
            product.SalePrice = view.SalePrice;
            product.Title = view.Title;
            product.TotalPages = view.TotalPages;
            product.Type = view.Type;

          await _product.Create(product);
        }

        public Task Delete(CreateProductView view)
        {
            throw new NotImplementedException();
        }

        public Task<Product> FindId(string id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Product>> GetAll()
        {
            return await _product.GetAll();
        }

        public Task Update(CreateProductView view)
        {
            throw new NotImplementedException();
        }
    }
}