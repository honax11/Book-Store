using BookStore.BusinessLogic.Helfer;
using BookStore.DataAccess.Models;
using Microsoft.AspNetCore.Mvc;

namespace Book_Store.Controllers
{
        [Route("api/[controller]")]
        [ApiController]
        public class FilesController : ControllerBase
        {
            private readonly IFileService _uploadService;

            public FilesController(IFileService uploadService)
            {
                _uploadService = uploadService;
            }

            /// <summary>
            /// Single File Upload
            /// </summary>
            /// <param name="file"></param>
            /// <returns></returns>
            [HttpPost("PostSingleFile")]
            public async Task<ActionResult> PostSingleFile(IFormFile fileDetails)
            {
                if (fileDetails == null)
                {
                    return BadRequest();
                }

                try
                {
                    await _uploadService.PostFileAsync(fileDetails);
                    return Ok();
                }
                catch (Exception)
                {
                    throw;
                }
            }

            /// <summary>
            /// Multiple File Upload
            /// </summary>
            /// <param name="file"></param>
            /// <returns></returns>
            [HttpPost("PostMultipleFile")]
            public async Task<ActionResult> PostMultipleFile([FromForm] List<Banner> fileDetails)
            {
                if (fileDetails == null)
                {
                    return BadRequest();
                }

                try
                {
                    await _uploadService.PostMultiFileAsync(fileDetails);
                    return Ok();
                }
                catch (Exception)
                {
                    throw;
                }
            }

            /// <summary>
            /// Download File
            /// </summary>
            /// <param name="file"></param>
            /// <returns></returns>
            [HttpGet("DownloadFile")]
            public async Task<ActionResult> DownloadFile(int id)
            {
                if (id < 1)
                {
                    return BadRequest();
                }

                try
                {
                    await _uploadService.DownloadFileById(id);
                    return Ok();
                }
                catch (Exception)
                {
                    throw;
                }
            }
        }
    }

