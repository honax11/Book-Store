namespace BookStore.DataAccess.Models
{
    public class Author : BaseEntity
    {
      public string FirstName { get; set; }
      public string SecondName { get; set; }
      public DateTime BirthDay { get; set; }
      public DateTime? DayOfDeath { get; set; }
      public virtual List<Ganre> Ganres { get; set; } = new List<Ganre>();
      public virtual List<Product> Products { get; set; } = new List<Product>();
    }
}