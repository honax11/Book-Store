using BookStore.DataAccess.Data;
using BookStore.DataAccess.Models;
using BookStore.DataAccess.Repositoris.Interfaces;

namespace BookStore.DataAccess.Repositoris
{
    public class MagazineRepository: GenericRepository<Magazine>, IMagazineRepository
    {
        public MagazineRepository(DataContext context): base (context)
        {
            
        }
    }
}