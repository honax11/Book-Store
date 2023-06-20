using BookStore.DataAccess.Data;
using BookStore.DataAccess.Models;
using BookStore.DataAccess.Repositoris.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BookStore.DataAccess.Repositoris
{
    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        public ProductRepository(DataContext contex) : base(contex)
        {

        }

        public async Task<List<Product>> GetProductAll()
        {
            var product = await _context.Books.Include(p => p.Ganre).Include(a => a.Author).ToListAsync();

            return product;

        }
        
    }
}