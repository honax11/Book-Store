using BookStore.DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.DataAccess.Data
{
    public class DataContext: DbContext 
    { 
        public DbSet<Ganre> Genre {get;set;}
        public DbSet<Author> Author {get;set;}
        public DbSet<Book> Book {get;set;}
        public DbSet<Orders> Orders {get; set; }
        public DbSet<Magazine> Magazines {get; set; }
        public DbSet<Users> Users { get; set; }
        


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
            modelBuilder.Entity<Orders>(builder =>
                 {
                     builder.HasNoKey();
                     builder.ToTable("MY_ENTITY");
                });
        }

        
    }
}