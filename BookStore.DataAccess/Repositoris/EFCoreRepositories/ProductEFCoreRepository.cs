using BookStore.DataAccess.Data;
using BookStore.DataAccess.Models;
using BookStore.DataAccess.Repositoris.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BookStore.DataAccess.Repositoris.EFCoreRepositories
{
    public class ProductEFCoreRepository : GenericEFCoreRepository<Product>, IProductRepository
    {
        public ProductEFCoreRepository(DataContext context) : base(context)
        {

        }

        public async Task <List<OrderItem>> GetProductsById ()
        {
            var orderItems = await _context.OrderItems
        .Include(item => item.Product)
        .ToListAsync();

            return orderItems;
        }

        public async Task<List<Product>> GetProductAll()
        {
            var product = await _context.Books.Include(p => p.Ganre).Include(a => a.Author).ToListAsync();

            return product;

        }

    }
}