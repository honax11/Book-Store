using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.DataAccess.Models
{
    public class Orders
    {
        public string Сountry { get; set; }
        public string Region { get; set;}
        public string Location { get; set; }
        public string PostIndex { get; set; }
        public string NumerPost { get; set; }
        public string Product { get; set; }
        public List<Book> Book { get; set; }
        public string TotalOrderPrice { get; set; }
        
    }
}