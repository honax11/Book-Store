using BookStore.DataAccess.Models;
using BookStore.DataAccess.Repositoris.Interfaces;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace BookStore.BusinessLogic.Views
{
    public class CreateAuthorView
    {
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public DateTime BirthDay { get; set; }
        public DateTime? DayOfDeath { get; set; }
        public List<string> Ganres {get; set;}
        public List<string> Products { get; set; }
        
    }
}