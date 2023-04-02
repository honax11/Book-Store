using BookStore.DataAccess.Models.Enums;

namespace BookStore.DataAccess.Models
{
    public class User: BaseEntity
    {
        public UserType UserType { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Password { get; set;}
        public string Login { get; set; }
        
    }
}