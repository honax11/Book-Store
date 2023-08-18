using BookStore.BusinessLogic.Services.Interfaces;
using BookStore.BusinessLogic.Views;
using BookStore.DataAccess.Models;
using BookStore.DataAccess.Repositoris.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace BookStore.BusinessLogic.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;

        public OrderService (IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public async Task Create(CreateOrderView view)
        {
            if (view == null)
            {
                throw new Exception("Order not create");
            }

            var order = new Order();
            order.Name = view.Name;
            order.NumerPost = view.PostIndex;
            order.Products = view.Products;
            order.Region = view.Region;
            order.TotalOrderPrice = view.TotalOrderPrice;
            order.Сountry = view.Сountry;

            await _orderRepository.Create(order);

        }

        public async Task Delete(string id)
        {
            var order = await _orderRepository.FindId(id);

            if (order == null)
            {
                throw new Exception("Order not finde");
            }

            order.IsDeleted = true;
        }

        public async Task<Order> FindId(string id)
        {
            return await _orderRepository.FindId(id);
        }

        public async Task<IEnumerable<Order>> GetAll()
        {
            return await _orderRepository.GetAll();
        }

        public Task Update(UpdateOrderView view)
        {
            throw new NotImplementedException();
        }
    }
}
