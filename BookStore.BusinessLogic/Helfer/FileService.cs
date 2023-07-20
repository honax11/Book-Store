
using BookStore.DataAccess.Data;
using BookStore.DataAccess.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic.FileIO;

namespace BookStore.BusinessLogic.Helfer
{
    public class FileService : IFileService
    {
        private readonly DataContext _dbContextClass;

        public FileService(DataContext dbContextClass)
        {
            _dbContextClass = dbContextClass;
        }

        public async Task PostFileAsync(IFormFile fileData)
        {
            try
            {
                var fileDetails = new Banner()
                {
                    Name = fileData.FileName,
                    
                };

                using (var stream = new MemoryStream())
                {
                    fileData.CopyTo(stream);
                   // fileDetails.Url = stream.ToString();
                }

                var result = _dbContextClass.Banners.Add(fileDetails);
                await _dbContextClass.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task PostMultiFileAsync(List<Banner> fileData)
        {
            try
            {
                foreach (Banner file in fileData)
                {
                    var fileDetails = new Banner()
                    {
                        Id = file.Id,
                        Name = file.Name,
                        Order = file.Order,
                    };

                    var result = _dbContextClass.Banners.Add(fileDetails);
                }
                await _dbContextClass.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task DownloadFileById(string Id)
        {
            try
            {
                var file = _dbContextClass.Banners.Where(x => x.Id == Id).FirstOrDefaultAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task CopyStream(Stream stream, string downloadPath)
        {
            using (var fileStream = new FileStream(downloadPath, FileMode.Create, FileAccess.Write))
            {
                await stream.CopyToAsync(fileStream);
            }
        }

        public Task DownloadFileById(int fileName)
        {
            throw new NotImplementedException();
        }
    }
}

