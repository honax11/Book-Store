
using BookStore.BusinessLogic.Helfer.Dropbox;
using BookStore.BusinessLogic.Services.Interfaces;
using BookStore.BusinessLogic.Views;
using BookStore.DataAccess.Models;
using BookStore.DataAccess.Repositoris.Interfaces;
using Microsoft.Extensions.Configuration;
using static Dropbox.Api.Files.SearchMatchTypeV2;

namespace BookStore.BusinessLogic.Services
{
    public  class BannerService: IBannerService
    {
        private readonly IBannerRepository _bannerRepository;
        private readonly IDropBoxFilesService _dropBoxFilesService;
       
        
        public BannerService(IBannerRepository bannerRepository, IDropBoxFilesService dropBoxFilesService)
        {
            _bannerRepository = bannerRepository;
            _dropBoxFilesService = dropBoxFilesService;
        }

        public async Task Create(CreateBannerView view)
        {
            if (view == null)
            {
                throw new Exception("Banner is not create");
            }
            Banner banner = new Banner();
            banner.Name = view.Name;
            banner.Order = view.Order;
            banner.Url = await _dropBoxFilesService.GetFile(view.Url);
            banner.IsActive = true;

           
            
      

            await _bannerRepository.Create(banner);
        }

        public async Task Delete(string id)
        {
            var banner = await _bannerRepository.FindId(id);

            if (banner == null)
            {
                throw new Exception("Banner not found");
            }
            banner.IsDeleted = true;

            await _bannerRepository.Update(banner);
        }

        public async Task<Banner> FindId(string id)
        {
            return await _bannerRepository.FindId(id);
        }

        public async Task<IEnumerable<Banner>> GetAll()
        {
            return await _bannerRepository.GetAll();
        }

        public async Task Update(UpdateBannerView view)
        {
            var update = await _bannerRepository.FindId(view.Id);

            if (update == null)
            {
                throw new Exception("Banner not found");
            }
            update.Name = view.Name;
            update.Order = view.Order;
            update.Url = view.Url;
            update.IsActive = true;

            await _bannerRepository.Update(update);
        }

    
    }
}
