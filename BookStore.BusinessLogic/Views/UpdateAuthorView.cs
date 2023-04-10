using BookStore.DataAccess.Models;

namespace BookStore.BusinessLogic.Views
{
    public class UpdateAuthorView
    {
        public string Id {get; set;}
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public DateTime BirthDay { get; set; }
        public DateTime? DayOfDeath { get; set; }
        public string GanreId { get; set; }
        public List<Ganre> Ganres {get; set;}
        public List<Product> Products {get; set;}
        public string DescriptionOfGenre {get; set;}
    }
}