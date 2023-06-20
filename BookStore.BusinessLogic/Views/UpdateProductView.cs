
using BookStore.DataAccess.Models;

namespace BookStore.BusinessLogic.Views
{
    public class UpdateProductView
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public double Prace { get; set; }
        public double SalePrice { get; set; }
        public string AuthorsId { get; set; }
        public string GanreId { get; set; }

        
    }
}
