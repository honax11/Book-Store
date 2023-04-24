
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

        public async Task <List<Ganre>> ListGanreId(List<string> ids)
        {
            var listGanre = await _context.Genres.Where(g => ids.Contains(g.Id)).ToListAsync();
            
            return listGanre;
        }
    }
}