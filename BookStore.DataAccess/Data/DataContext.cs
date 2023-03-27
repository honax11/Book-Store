using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore.DataAccess.Data
{
    public class DataContext: DbContext 
    { 
        public DbSet<Genre> Genre {get;set;}
        public DbSet<Author> Author {get;set;}
        public DbSet<Book> Book {get;set;}
        public DbSet<Prices> Price {get; set;}


        public DataContext(DbContextOptions options): base (options)
        {

        }


        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            if (!options.IsConfigured)
            {
                options.UseSqlite();
            }
        }
    
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
         base.OnModelCreating(modelBuilder);   
        }

        
    }
}