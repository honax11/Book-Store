namespace BookStore.DataAccess.Models
{
    public class Author : BaseEntety
    {
       public Ganre Ganre {get; set;}
       public Book Book {get; set;}
      //  public List<Genre> Ganres { get; set; }
         
    }
}