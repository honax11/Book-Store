using BookStore.BusinessLogic.Services;
using BookStore.BusinessLogic.Services.Interfaces;
using BookStore.BusinessLogic.Views;
using BookStore.DataAccess.Models;
using Microsoft.AspNetCore.Mvc;

namespace Book_Store.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class BannerController: ControllerBase
    {
        private readonly IBannerService _bannerService;

        public BannerController (IBannerService bannerService)
        {
            _bannerService = bannerService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateBannerView view)
        {
            await _bannerService.Create(view);
            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Banner>>> GetAll()
        {
            return Ok(await _bannerService.GetAll());
        }
        [HttpGet]
        public async Task<ActionResult<Banner>> FindId(string id)
        {
            return Ok(await _bannerService.FindId(id));
        }

        [HttpPost]
        public async Task<IActionResult> Update(UpdateBannerView view)
        {
            await _bannerService.Update(view);
            return Ok();

        }

        [HttpDelete]
        public async Task<IActionResult> Delete(string id)
        {
            await _bannerService.Delete(id);
            return Ok();
        }
    }
}
