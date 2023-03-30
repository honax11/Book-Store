namespace BookStore.DataAccess.Models
{
    public class Author : BaseEntity
    {
      public string FistName { get; set; }
      public string SecondName { get; set; }
      public int BirthDay { get; set; }
      public int DayOfDeath { get; set; }
      public string GanreId { get; set; }
       public Ganre Ganre {get; set;}
       public Product Book {get; set;}
      //  public List<Genre> Ganres { get; set; }
         
    }
}