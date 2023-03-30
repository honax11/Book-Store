using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.DataAccess.Models
{
    public class Order
    {
        public string Сountry { get; set; }
        public string Region { get; set;}
        public string Location { get; set; }
        public string PostIndex { get; set; }
        public string NumerPost { get; set; }
        public string GoodsOfBook { get; set; }
        public List<Product> Book { get; set; }
        public double TotalOrderPrice { get; set; }
        
    }
}