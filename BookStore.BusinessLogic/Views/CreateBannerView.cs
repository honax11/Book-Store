
using Microsoft.AspNetCore.Http;

namespace BookStore.BusinessLogic.Views
{
    public class CreateBannerView
    {
        public string Url { get; set; }
       // public IFormFile FileDetails { get; set; }
        public string Name { get; set; }
        public string Order { get; set; }
    }
}
