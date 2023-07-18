
using BookStore.BusinessLogic.Views;
using BookStore.DataAccess.Models;
using System.Threading.Tasks;

namespace BookStore.BusinessLogic.Services.Interfaces
{
    public interface IBannerService
    {
        Task Create(CreateBannerView view);
        Task Delete(string id);
        Task<Banner> FindId(string id);
        Task Update(UpdateBannerView view);
        Task<IEnumerable<Banner>> GetAll();
    }
}
