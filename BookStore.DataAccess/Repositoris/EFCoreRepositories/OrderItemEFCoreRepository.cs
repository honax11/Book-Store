using BookStore.DataAccess.Data;
using BookStore.DataAccess.Models;
using BookStore.DataAccess.Repositoris.Interfaces;

namespace BookStore.DataAccess.Repositoris.EFCoreRepositories
{
    public class OrderItemEFCoreRepository: GenericEFCoreRepository<OrderItem>, IOrderItemRepository
    {
        public OrderItemEFCoreRepository(DataContext context): base(context) 
        {

        }

    }
}
