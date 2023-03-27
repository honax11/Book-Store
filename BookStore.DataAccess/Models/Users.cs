namespace BookStore.DataAccess.Models
{
    public class Users: BaseEntety
    {
        public string Admitistrator { get; set; }
        public string User { get; set; }
        public string Email { get; set; }
        public string TelefonNumer { get; set; }
        public string Password { get; set;}
        public string Login { get; set; }
        
    }
}