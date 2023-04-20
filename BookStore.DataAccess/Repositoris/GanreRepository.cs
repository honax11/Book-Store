
using BookStore.DataAccess.Data;
using BookStore.DataAccess.Models;
using BookStore.DataAccess.Repositoris.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BookStore.DataAccess.Repositoris
{
    public class GanreRepository: GenericRepository<Ganre>, IGanreRepository
    {
        public GanreRepository(DataContext context): base (context)
        {
            
        }

        public async Task <List<Ganre>> ListGanreId(string ganre)
        {
            var listGanre = await (from p in _context.Genres 
                where p.Id == ganre
                select p).ToListAsync();
            
            return listGanre;
        }
    }
}