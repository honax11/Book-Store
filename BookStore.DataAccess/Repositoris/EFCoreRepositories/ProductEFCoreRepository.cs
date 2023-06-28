using BookStore.DataAccess.Data;
using BookStore.DataAccess.Models;
using BookStore.DataAccess.Repositoris.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BookStore.DataAccess.Repositoris.EFCoreRepositories
{
    public class ProductEFCoreRepository : GenericEFCoreRepository<Product>, IProductRepository
    {
        public ProductEFCoreRepository(DataContext contex) : base(contex)
        {

        }

        public async Task<List<Product>> GetProductAll()
        {
            var product = await _context.Books.Include(p => p.Ganre).Include(a => a.Author).ToListAsync();

            return product;

        }

    }
}