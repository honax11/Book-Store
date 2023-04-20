
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

        public async Task <List<Ganre>> ListGanreId(string id)
        {
            var listGanre = await _context.Genres.Where(g =>g.Id == id).ToListAsync();
            
            return listGanre;
        }
    }
}