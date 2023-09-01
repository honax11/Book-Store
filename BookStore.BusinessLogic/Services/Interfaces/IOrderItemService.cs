using BookStore.BusinessLogic.Views;
using BookStore.DataAccess.Models;

namespace BookStore.BusinessLogic.Services.Interfaces
{
    public interface IOrderItemService
    {
        Task Create(CreateOrderItemView view);
        Task Delete(string id);
        Task<OrderItem> FindId(string id);
        Task<IEnumerable<OrderItem>> GetAll();
        Task Update(UpdateOrderView view);
    }
}
