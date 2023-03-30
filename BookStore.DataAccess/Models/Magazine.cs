namespace BookStore.DataAccess.Models
{
    public class Magazine: BaseEntity
    {
        public string Name {get; set;}
        public string AuthorName { get; set; }
        public string Title { get; set; }
        public int Pages {get; set;}
        public double Price { get; set; }

        
    }
}