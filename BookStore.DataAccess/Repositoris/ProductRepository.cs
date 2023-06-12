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
            var autors = await _context.Books.Include(a => a.Author).ToListAsync();
            return autors;
            var ganres = await _context.Books.Include(g => g.Ganre).ToListAsync();
 
            return ganres;

        }
        
    }
}