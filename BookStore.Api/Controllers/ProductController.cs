using BookStore.BusinessLogic.Services.Interfaces;
using BookStore.BusinessLogic.Views;
using BookStore.DataAccess.Models;
using Microsoft.AspNetCore.Mvc;

namespace Book_Store.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ProductController: ControllerBase
    {
        private readonly IProductService _product;

        public ProductController (IProductService product)
        {
            _product = product;
        }

        [HttpPost]
        public async Task<IActionResult> Create (CreateProductView view)
        {
            await _product.Create(view);
            return Ok();
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetAll()
        {
             return Ok (await _product.GetAll());
        }

        [HttpGet]
        public async Task <ActionResult<Product>> FindId (string id)
        {
            return Ok (await _product.FindId(id));
        }
        [HttpPut]
        public async Task<IActionResult> Update(UpdateProductView view)
        {
             await _product.Update(view);
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(string id)
        {
            await _product.Delete(id);
            return Ok();

        }

        
    }
}