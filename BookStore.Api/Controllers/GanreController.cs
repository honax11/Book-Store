
using BookStore.BusinessLogic.Services;
using BookStore.BusinessLogic.Views;
using BookStore.DataAccess.Models;
using BookStore.DataAccess.Repositoris.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Book_Store.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class GanreController: ControllerBase
    {
        private readonly IGanreService _ganre;

        public GanreController (IGanreService ganre)
        {
            _ganre = ganre;
        }

        [HttpPost]
        public async Task<IActionResult> Create (CreateGanreView view)
        {
            await _ganre.Create(view);
            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ganre>>> GetAll()
        {
             return Ok (await _ganre.GetAll());
        }

        [HttpGet]
        public async Task <ActionResult<Ganre>> FindId (string id)
        {
            return Ok (await _ganre.FindId(id));
        }

        [HttpGet]
        public async Task Update ()
        {
            
        }

        
    }
}