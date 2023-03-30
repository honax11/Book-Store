using BookStore.DataAccess.Data;
using BookStore.DataAccess.Models;
using BookStore.DataAccess.Repositoris.Interfaces;

namespace BookStore.DataAccess.Repositoris
{
    public class ProductRepository: GenericRepository<Product>, IProductRepository
    {
         public ProductRepository(DataContext contex): base (contex)
        {

        }
        
    }
}