using BookStore.DataAccess.Models;


namespace BookStore.BusinessLogic.Views
{
    public class CreateOrderView
    {
        public string Сountry { get; set; }
        public string Region { get; set; }
        public string Location { get; set; }
        public string Name { get; set; }
        public string PostIndex { get; set; }
        public string NumerPost { get; set; }
        public double TotalOrderPrice { get; set; }
        public List<string> Products { get; set; }

    }
}
