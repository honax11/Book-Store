namespace BookStore.DataAccess.Models
{
    public class BaseEntity
    {
        public string Id { get; set; }
        public DateTime CreationDate {get; set;}
        public bool IsActive {get; set;}
        public bool  IsDeleted  {get; set;}
    }
}