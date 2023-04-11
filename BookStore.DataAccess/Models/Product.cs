using System.ComponentModel.DataAnnotations.Schema;
using BookStore.DataAccess.Models.Enums;

namespace BookStore.DataAccess.Models
{
    public class Product: BaseEntity
    {
        public string Name {get; set;}
        public string Title {get; set;}
        public string TotalPages {get; set;}
        [ForeignKey("Author")]
        public string AuthorId { get; set; }   
        public virtual Author Author {get; set;}
        [ForeignKey("Ganre")]
        public string GanreId {get; set;} 
        public virtual Ganre Ganre {get; set;}
        public double Price {get; set;}
        public double SalePrice { get; set; }
        public virtual ProductType Type {get; set;}
        public string Description { get; set; }

    }
}