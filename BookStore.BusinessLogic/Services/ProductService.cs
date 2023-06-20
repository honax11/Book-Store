using BookStore.BusinessLogic.Services.Interfaces;
using BookStore.BusinessLogic.Views;
using BookStore.DataAccess.Models;
using BookStore.DataAccess.Repositoris.Interfaces;

namespace BookStore.BusinessLogic.Services
{
    public class ProductService : IProductService
    {
        private IProductRepository _product;
        private IAuthorRepository _authorRepository;
        private IGanreRepository _ganreRepository;

        public ProductService (IProductRepository product, IAuthorRepository authorRepository, IGanreRepository ganreRepository)
        {
            _product = product;
            _authorRepository = authorRepository;
            _ganreRepository = ganreRepository;
        }


        public async Task Create(CreateProductView view)
        {
            if (view == null)
            {
                throw new Exception ("Product not create");
            }

            var product = new Product();
            product.Description = view.Description;
            product.Name = view.Name;
            product.Price = view.Price;
            product.SalePrice = view.SalePrice;
            product.Title = view.Title;
            product.TotalPages = view.TotalPages;
            product.Type = view.Type;

            var author = await _authorRepository.FindId(view.AuthorId);

            product.Author = author;

            var ganre = await _ganreRepository.FindId(view.GanreId);

            product.Ganre = ganre;

            

             await _product.Create(product);
        }

        public async Task Delete(string id)
        {
            var product =  await _product.FindId(id);

            if (product == null)
            {
                throw new Exception("Product not finde");
            }

            product.IsDeleted = true;

            await _product.Delete(product);


        }

        public async Task<Product> FindId(string id)
        {
            return await _product.FindId(id); 
        }

        public async Task<IEnumerable<Product>> GetAll()
        {
            return await _product.GetProductAll();
        }

        public async Task Update(UpdateProductView view)
        {
            var update = await _product.FindId(view.Id);

            if(update == null)
            {
                throw new Exception("Product is not found");
            }

            update.Name = view.Name;
            update.Price = view.Prace;
            update.SalePrice = view.SalePrice;
            update.Title = view.Title;

            var updateAuthor = await _authorRepository.FindId(view.AuthorsId);

            update.Author = updateAuthor;

            var updateGanre = await _ganreRepository.FindId(view.GanreId);

            update.Ganre = updateGanre;

            await _product.Update(update);
        }
    }
}