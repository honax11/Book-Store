namespace BookStore.DataAccess.Models
{
    public class Author : BaseEntity
    {
      public string Name { get; set; }
       public Ganre Ganre {get; set;}
       public Product Book {get; set;}
      //  public List<Genre> Ganres { get; set; }
         
    }
}