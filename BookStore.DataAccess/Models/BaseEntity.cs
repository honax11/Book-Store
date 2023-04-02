namespace BookStore.DataAccess.Models
{
    public abstract class BaseEntity
    {
        public BaseEntity(){
            
            Id = Guid.NewGuid().ToString();
            CreationDate = DateTime.Now.Date;
        }
        public string Id { get; set; }
        public DateTime CreationDate {get; set;}
        public bool IsActive {get; set;}
        public bool  IsDeleted  {get; set;}
    }
}