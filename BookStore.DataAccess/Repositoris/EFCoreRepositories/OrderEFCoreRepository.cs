using BookStore.DataAccess.Data;
using BookStore.DataAccess.Models;
using BookStore.DataAccess.Repositoris.Interfaces;

namespace BookStore.DataAccess.Repositoris.EFCoreRepositories
{
    public class OrderEFCoreRepository : GenericEFCoreRepository<Order>, IOrderRepository
    {
        public OrderEFCoreRepository(DataContext context) : base(context)
        {

        }

    }
}