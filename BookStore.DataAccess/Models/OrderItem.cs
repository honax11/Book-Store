using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.DataAccess.Models
{
    public class OrderItem: BaseEntity
    {
        [ForeignKey("Product")]
        public string ProductId { get; set; }
        public string Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        [ForeignKey("Order")]
        public string OrderId { get; set; }
        public Order Order { get; set; }
        public Product Product { get; set; } 
    }
}
