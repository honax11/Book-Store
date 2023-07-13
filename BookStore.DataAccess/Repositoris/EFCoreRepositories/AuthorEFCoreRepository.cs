using BookStore.DataAccess.Data;
using BookStore.DataAccess.Models;
using BookStore.DataAccess.Repositoris.Interfaces;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace BookStore.DataAccess.Repositoris.EFCoreRepositories
{
    public class AuthorEFCoreRepository : GenericEFCoreRepository<Author>, IAuthorRepository
    {
        public AuthorEFCoreRepository(DataContext context) : base(context)
        {

        }

        public Task<IEnumerable<Author>> GetCompanies()
        {
            throw new NotImplementedException();
        }

        public async Task<List<Author>> ListGetAll()
        {
            var ganresAthor = await _context.Authors.Include(a => a.Ganres).ToListAsync();

            return ganresAthor;
        }
    }
}