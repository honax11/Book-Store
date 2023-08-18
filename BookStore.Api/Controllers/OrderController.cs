using BookStore.BusinessLogic.Services.Interfaces;
using BookStore.BusinessLogic.Views;
using BookStore.DataAccess.Models;
using Microsoft.AspNetCore.Mvc;

namespace Book_Store.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]

    public class OrderController: ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController (IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateOrderView view)
        {
            await _orderService.Create(view);
            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetAll()
        {
            return Ok(await _orderService.GetAll());
        }

        [HttpGet]
        public async Task<ActionResult<Product>> FindId(string id)
        {
            return Ok(await _orderService.FindId(id));
        }
        [HttpPut]
        public async Task<IActionResult> Update(UpdateOrderView view)
        {
            await _orderService.Update(view);
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(string id)
        {
            await _orderService.Delete(id);
            return Ok();

        }

    }
}
