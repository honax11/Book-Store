using BookStore.BusinessLogic.Views;
using BookStore.DataAccess.Models;

namespace BookStore.BusinessLogic.Services.Interfaces
{
    public interface IOrderService
    {
        Task Create(CreateOrderView view);
        Task Delete(string id);
        Task<Order> FindId(string id);
        Task<IEnumerable<Order>> GetAll();
        Task Update(UpdateOrderView view);
    }
}
