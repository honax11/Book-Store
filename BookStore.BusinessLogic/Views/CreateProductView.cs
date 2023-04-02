using BookStore.DataAccess.Models;
using BookStore.DataAccess.Models.Enums;

namespace BookStore.BusinessLogic.Views
{
    public class CreateProductView
    {
        public string Id { get; set; }
        public DateTime CreationDate {get; set;}
        public bool IsActive {get; set;}
        public bool  IsDeleted  {get; set;}
        public string Name {get; set;}
        public string Title {get; set;}
        public string TotalPages {get; set;}
        public string AuthorId { get; set; }
        public Author Author {get; set;}
        public string GanreId {get; set;}
        public Ganre Ganre {get; set;}
        public double Price {get; set;}
        public double SalePrice { get; set; }
        public ProductType Type {get; set;}
        public string Description { get; set; }

    }
}