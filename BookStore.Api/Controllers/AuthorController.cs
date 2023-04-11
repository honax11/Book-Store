using BookStore.BusinessLogic.Services.Interfaces;
using BookStore.BusinessLogic.Views;
using BookStore.DataAccess.Models;
using Microsoft.AspNetCore.Mvc;

namespace Book_Store.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AuthorController: ControllerBase
    {
                private readonly IAuthorService _authorService;

        public AuthorController (IAuthorService authorService)
        {
            _authorService = authorService;
        }

        [HttpPost]
        public async Task<IActionResult> Create (CreateAuthorView view)
        {
            await _authorService.Create(view);
            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Author>>> GetAll()
        {
             return Ok (await _authorService.GetAll());
        }

        [HttpGet]
        public async Task <ActionResult<Author>> FindId (string id)
        {
            return Ok (await _authorService.FindId(id));
        }

        [HttpPut]
        public async Task <IActionResult> Update (UpdateGanreView view)
        {
            //await _authorService.Update(view);
            return Ok();

        }

        [HttpDelete]
        public async Task<IActionResult> Delete(string id)
        {
            await _authorService.Delete(id);
            return Ok();
        }

    }
}