
using BookStore.BusinessLogic.Views;
using BookStore.DataAccess.Models;
using Microsoft.AspNetCore.Http;

namespace BookStore.BusinessLogic.Helfer.Dropbox
{
    public interface IDropBoxFilesService
    {
        Task WriteFile(string FileName, byte[] Content);
        Task<string> Upload(IFormFile file);
    }
}
