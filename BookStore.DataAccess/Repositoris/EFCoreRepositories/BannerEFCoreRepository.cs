using BookStore.DataAccess.Data;
using BookStore.DataAccess.Models;
using BookStore.DataAccess.Repositoris.Interfaces;
using Dropbox.Api;
using Dropbox.Api.Files;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace BookStore.DataAccess.Repositoris.EFCoreRepositories
{
    public  class BannerEFCoreRepository: GenericEFCoreRepository<Banner>, IBannerRepository
    {
        public BannerEFCoreRepository(DataContext context, IConfiguration configuration) : base(context)
        {
            _configuration = configuration;
            
         
        }
        private readonly IConfiguration _configuration;

        public async Task<byte[]> GetFile(string File)
        {
            string _accessToken = _configuration.GetSection("DropBoxConfiguration:DropBoxAccessToken").Value;

            using (var _dropBox = new DropboxClient(_accessToken))
            using (var _response = await _dropBox.Files.DownloadAsync("/" + File))
            {
                return await _response.GetContentAsByteArrayAsync();
            }
        }

        public async Task WriteFile(string FileName, byte[] Content)
        {
            string AccessToken = _configuration.GetSection("DropBoxConfiguration:DropBoxAccessToken").Value;
            using (var _dropBox = new DropboxClient(AccessToken))
            using (var _memoryStream = new MemoryStream(Content))
            {
                var updated = await _dropBox.Files.UploadAsync(
                     "/" + FileName,
                    WriteMode.Overwrite.Instance,
                    body: _memoryStream);
            }
        }
    }
}
