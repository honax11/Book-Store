
using BookStore.DataAccess.Models;
using BookStore.DataAccess.Models.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.VisualBasic.FileIO;

namespace BookStore.BusinessLogic.Helfer
{
    public interface IFileService
    {
        public Task PostFileAsync(IFormFile fileData, FileType fileType);

        public Task PostMultiFileAsync(List<FileUploadModel> fileData);

        public Task DownloadFileById(int fileName);
    }
}
