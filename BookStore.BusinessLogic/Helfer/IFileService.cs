
using BookStore.DataAccess.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.VisualBasic.FileIO;

namespace BookStore.BusinessLogic.Helfer
{
    public interface IFileService
    {
        public Task PostFileAsync(IFormFile fileData);

        public Task PostMultiFileAsync(List<Banner> fileData);

        public Task DownloadFileById(int fileName);
    }
}
