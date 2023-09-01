using BookStore.BusinessLogic.Services.Interfaces;
using BookStore.BusinessLogic.Views;
using BookStore.DataAccess.Models;
using BookStore.DataAccess.Repositoris.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace BookStore.BusinessLogic.Services
{
    public class OrderItemService : IOrderItemService
    {
        private readonly IOrderItemRepository _orderItemRepository;
        private readonly IProductRepository _productRepository;
        private readonly IOrderRepository _orderRepository;
        
        public OrderItemService(IOrderItemRepository orderItemRepository, IProductRepository productRepository, IOrderRepository orderRepository)
        {
            _orderItemRepository = orderItemRepository;
            _productRepository = productRepository;
            _orderRepository = orderRepository;

        }
        public async Task Create(CreateOrderItemView view)
        {
            if (view == null) 
            {
                throw new Exception("OrderItem not create");
            }

            var orderItem = new OrderItem();
            orderItem.UnitPrice = view.UnitPrice;
            orderItem.Quantity = view.Quantity;

            var productId = await _productRepository.FindId(view.ProductId);

            orderItem.Product = productId;

            var orderId = await _orderRepository.FindId(view.OrderId);

            orderItem.Order = orderId;

            await _orderItemRepository.Create(orderItem);
           
        }

        public Task Delete(string id)
        {
            throw new NotImplementedException();
        }

        public Task<OrderItem> FindId(string id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<OrderItem>> GetAll()
        {
            return await _orderItemRepository.GetAll();
        }

        public Task Update(UpdateOrderView view)
        {
            throw new NotImplementedException();
        }
    }
}
