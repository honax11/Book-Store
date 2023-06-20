using BookStore.DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.DataAccess.Data
{
    public class DataContext: DbContext 
    { 
        public DbSet<Ganre> Genres {get;set;}
        public DbSet<Author> Authors {get;set;}
        public DbSet<Product> Books {get;set;}
        public DbSet<Order> Orders {get; set; }
        public DbSet<User> Users { get; set; }
        


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
            modelBuilder.Entity<Order>(builder =>
                 {
                     builder.HasNoKey();
                     builder.ToTable("Order");
                });

          

        }

        
    }
    
}