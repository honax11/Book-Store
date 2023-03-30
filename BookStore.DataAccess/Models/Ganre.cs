using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.DataAccess.Models
{
    public class Ganre: BaseEntity
    {
        public string Name { get; set; }
        public string AuthorId { get; set; }
        public Author Author {get; set;}
        public Book Book{get; set;}
    }
}