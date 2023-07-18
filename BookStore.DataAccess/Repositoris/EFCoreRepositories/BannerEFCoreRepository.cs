using BookStore.DataAccess.Data;
using BookStore.DataAccess.Models;
using BookStore.DataAccess.Repositoris.Interfaces;

namespace BookStore.DataAccess.Repositoris.EFCoreRepositories
{
    public  class BannerEFCoreRepository: GenericEFCoreRepository<Banner>, IBannerRepository
    {
        public BannerEFCoreRepository(DataContext context) : base(context)
        {

        }
    }
}
