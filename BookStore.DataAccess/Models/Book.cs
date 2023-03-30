using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.DataAccess.Models
{
    public class Book: BaseEntity
    {
        public string Id {get; set;}
        public string Title {get; set;}
        public string TotalPages {get; set;}
        public string AuthorId { get; set; }
        public Author Author {get; set;}
        public string GanreId {get; set;}
        public Ganre Ganre {get; set;}
        public double Price {get; set;}
        public double SalePrice { get; set; }

    }
}