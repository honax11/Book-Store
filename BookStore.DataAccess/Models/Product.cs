using System.ComponentModel.DataAnnotations.Schema;
using BookStore.DataAccess.Models.Enums;

namespace BookStore.DataAccess.Models
{
    public class Product: BaseEntity
    {
        public string Name {get; set;}
        public string Title {get; set;}
        public string TotalPages {get; set;}
        public string AuthorId { get; set; }
        public Author Author {get; set;}
        public string GanreId {get; set;}
        public Ganre Ganre {get; set;}
        public double Price {get; set;}
        public double SalePrice { get; set; }
        public ProductType ProductType {get; set;}
        public string ProductDescription { get; set; }

    }
}