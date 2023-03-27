using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore.DataAccess.Models
{
    public class Prices
    {
        public string Id { get; set; }
        public string Price { get; set; }
        public string AuthorsId { get; set; }
        public string GenreId { get; set;}
        public string BookId { get; set; }
    }
}