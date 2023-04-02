namespace BookStore.DataAccess.Models
{
    public class Author : BaseEntity
    {
      public string FirstName { get; set; }
      public string SecondName { get; set; }
      public DateTime BirthDay { get; set; }
      public DateTime DayOfDeath { get; set; }
      public string GanreId { get; set; }
       public Ganre Ganre {get; set;}
       public Product Book {get; set;}
       public string DescriptionOfGenre {get; set;}
      //  public List<Genre> Ganres { get; set; }
         
    }
}