using System.ComponentModel.DataAnnotations.Schema;
using BookStore.DataAccess.Models;
using BookStore.DataAccess.Models.Enums;

namespace BookStore.BusinessLogic.Views
{
    public class CreateProductView
    {
        public string Name {get; set;}
        public string Title {get; set;}
        public string TotalPages {get; set;}
        [ForeignKey("Author")]
        public string AuthorId { get; set; }
        [ForeignKey("Ganre")]
        public string GanreId {get; set;}
        public double Price {get; set;}
        public double SalePrice { get; set; }
        public ProductType Type {get; set;}
        public string Description { get; set; }

    }
}