using BookStore.DataAccess.Models;

namespace BookStore.BusinessLogic.Views
{
    public class CreateOrderItemView
    {
        public string Id { get; set; }
        public string ProductId { get; set; }
        public string Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public string OrderId { get; set; }
        public virtual List<string> Product { get; set; }
    }
}
