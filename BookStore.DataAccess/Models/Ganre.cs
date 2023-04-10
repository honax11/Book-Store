using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.DataAccess.Models
{
    public class Ganre: BaseEntity
    {
        public string Name { get; set; }
        public string Description {get; set;}

        
    }
}