
using BookStore.BusinessLogic.Services.Interfaces;
using BookStore.BusinessLogic.Views;
using BookStore.DataAccess.Models;
using BookStore.DataAccess.Repositoris.Interfaces;

namespace BookStore.BusinessLogic.Services
{
    public  class BannerService: IBannerService
    {
        private readonly IBannerRepository _bannerRepository;
        
        public BannerService(IBannerRepository bannerRepository)
        {
            _bannerRepository = bannerRepository;
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
            banner.Url = view.Url;
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
