
using BookStore.DataAccess.Data;
using BookStore.DataAccess.Models;
using BookStore.DataAccess.Repositoris.Interfaces;

namespace BookStore.DataAccess.Repositoris
{
    public class OrderRepository: GenericRepository<Order>, IOrderRepository
    {
        public OrderRepository(DataContext context): base (context)
        {
            
        }
        
    }
}