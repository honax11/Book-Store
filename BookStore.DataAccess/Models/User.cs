namespace BookStore.DataAccess.Models
{
    public class Users: BaseEntity
    {
        public string User { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Password { get; set;}
        public string Login { get; set; }
        
    }
}