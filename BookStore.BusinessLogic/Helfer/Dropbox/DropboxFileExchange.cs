
using Azure.Core;
using BookStore.BusinessLogic.Views;
using BookStore.DataAccess.Data;
using BookStore.DataAccess.Models;
using Dropbox.Api;
using Dropbox.Api.Files;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using static Dropbox.Api.SeenState.PlatformType;

namespace BookStore.BusinessLogic.Helfer.Dropbox
{
    public class DropboxFileExchange : IDropBoxFilesService
    {
        private readonly IConfiguration _configuration;
        private readonly DataContext _dataContext;

        public DropboxFileExchange(IConfiguration configuration, DataContext dataContext)
        {
            _configuration = configuration;
            _dataContext = dataContext;
        }
        public async Task<string> Upload(IFormFile file)
        {
            string url = string.Empty;
            using (var dbx = new DropboxClient(_configuration["DropBoxToken"]))
            {
                string folder = $"/Products/{DateTime.UtcNow.ToString("dd-mm-yyyy")}";
                using (var mem = new MemoryStream())
                {
                    var updated = await dbx.Files.UploadAsync(folder + "/" + file.FileName, WriteMode.Overwrite.Instance, body: file.OpenReadStream());
                    var exist = await dbx.Sharing.ListSharedLinksAsync(folder + "/" + file.FileName);

                    var tx = dbx.Sharing.CreateSharedLinkWithSettingsAsync(folder + "/" + file.FileName);
                    tx.Wait();
                    url = tx.Result.Url;
                    url = url.Remove(0, 24);
                    return "https://dl.dropboxusercontent.com/" + url;
                }
            }
        }
        public async Task WriteFile(string FileName, byte[] Content)
        {
            string AccessToken = _configuration["DropBoxConfiguration:DropBoxAccessToken"];
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
