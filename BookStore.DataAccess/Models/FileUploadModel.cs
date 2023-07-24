
using BookStore.DataAccess.Models.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.VisualBasic.FileIO;

namespace BookStore.DataAccess.Models
{
    public class FileUploadModel
    {
        public IFormFile FileDetails { get; set; }
        public FileType FileType { get; set; }
    }
}
