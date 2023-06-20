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
        public List<string> Ganres {get; set;}
        public List<string> Products {get; set;}
        public bool IsActive {get; set;}
    }
}