
using BookStore.BusinessLogic.Services;
using BookStore.BusinessLogic.Views;
using BookStore.DataAccess.Models;
using BookStore.DataAccess.Repositoris.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Book_Store.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class GanreController : ControllerBase
    {
        private readonly IGanreService _ganre;

        public GanreController(IGanreService ganre)
        {
            _ganre = ganre;
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateGenreView view)
        {
            await _ganre.Create(view);
            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ganre>>> GetAll()
        {
            return Ok(await _ganre.GetAll());
        }

        [HttpGet]
        public async Task<ActionResult<Ganre>> FindId(string id)
        {
            return Ok(await _ganre.FindId(id));
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdateGenreView view)
        {
            await _ganre.Update(view);
            return Ok();

        }

        [HttpDelete]
        public async Task<IActionResult> Delete(string id)
        {
            await _ganre.Delete(id);
            return Ok();
        }


    }
}