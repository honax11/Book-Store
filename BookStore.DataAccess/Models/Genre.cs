using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.DataAccess.Models
{
    public class Genre: BaseEntity
    {
        public string Name { get; set; }
        public string Description {get; set;}
        public List<Product> Products { get; set; }

    }
}