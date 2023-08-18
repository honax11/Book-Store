using BookStore.DataAccess.Data;
using BookStore.DataAccess.Models;
using BookStore.DataAccess.Repositoris.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace BookStore.DataAccess.Repositoris.EFCoreRepositories
{
    public class GenreEFCoreRepository : GenericEFCoreRepository<Ganre>, IGenreRepository
    {
        public GenreEFCoreRepository(DataContext context) : base(context)
        {

        }

        public async Task<List<Ganre>> ListGanreId(List<string> ids)
        {
            var listGanre = await _context.Genres.Where(g => ids.Contains(g.Id)).ToListAsync();

            return listGanre;
        }
    }
}