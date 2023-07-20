using BookStore.DataAccess.Models;

namespace BookStore.DataAccess.Repositoris.Interfaces
{
    public interface IBannerRepository: IGenericRepository<Banner>
    {
        Task<byte[]> GetFile(string File);
        Task WriteFile(string FileName, byte[] Content);
    }
}
