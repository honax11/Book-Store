﻿

namespace BookStore.DataAccess.Models
{
    public class Banner: BaseEntity
    {
        public string Url { get; set; }
        public string Name { get; set; }
        public string Order { get; set; }
    }
}
