using BookStore.DataAccess.Models;

namespace BookStore.BusinessLogic.Views
{
    public class CreateAuthorView
    {
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public DateTime BirthDay { get; set; }
        public DateTime? DayOfDeath { get; set; }
        public List<string> Ganres {get; set;}
    }
}