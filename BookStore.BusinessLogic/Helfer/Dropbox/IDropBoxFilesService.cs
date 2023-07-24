
namespace BookStore.BusinessLogic.Helfer.Dropbox
{
    public interface IDropBoxFilesService
    {
        Task<string> GetFile(string File);
    }
}
