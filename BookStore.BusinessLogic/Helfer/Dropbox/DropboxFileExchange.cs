
using Dropbox.Api;
using Microsoft.Extensions.Configuration;

namespace BookStore.BusinessLogic.Helfer.Dropbox
{
    public class DropboxFileExchange: IDropBoxFilesService
    {
        private readonly IConfiguration _configuration;

        public DropboxFileExchange (IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<string> GetFile(string File)
        {
            string AccessToken = _configuration["DropBoxConfiguration:DropBoxAccessToken"];

            using (var _dropBox = new DropboxClient(AccessToken))
            using (var response = await _dropBox.Files.DownloadAsync("/" + File))
            {
                return await response.GetContentAsStringAsync();
            }
        }
    }
}
