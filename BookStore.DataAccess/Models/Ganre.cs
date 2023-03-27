using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.DataAccess.Models
{
    public class Ganre: BaseEntety
    {
        public Book Book{get; set;}
    }
}