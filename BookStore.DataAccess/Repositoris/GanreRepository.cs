
using BookStore.DataAccess.Data;
using BookStore.DataAccess.Models;
using BookStore.DataAccess.Repositoris.Interfaces;

namespace BookStore.DataAccess.Repositoris
{
    public class GanreRepository: GenericRepository<Ganre>, IGanreRepository
    {
        public GanreRepository(DataContext context): base (context)
        {
            
        }
    }
}