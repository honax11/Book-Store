using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.DataAccess.Models
{
    public class Order: BaseEntity
    {
        public string Сountry { get; set; }
        public string Region { get; set;}
        public string Location { get; set; }
        public string Name { get; set; }
        public string PostIndex { get; set; }
        public string NumerPost { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; } 
       // public virtual List<Product> Products { get; set; } = new List<Product>();
        public double TotalOrderPrice { get; set; }
        
    }
}