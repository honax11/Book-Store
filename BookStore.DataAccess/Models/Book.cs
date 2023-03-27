using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore.DataAccess.Models
{
    public class Book
    {
        public string Id {get; set;}
        public string Title {get; set;}
        public string TotalPages {get; set;}
        public string AuthorId { get; set; }
        public string GenreId {get; set;}

    }
}