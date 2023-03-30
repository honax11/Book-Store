
using BookStore.DataAccess.Data;
using BookStore.DataAccess.Models;
using BookStore.DataAccess.Repositoris.Interfaces;

namespace BookStore.DataAccess.Repositoris
{
    public class UserRepository: GenericRepository<Users>, IUsersRepository
    {
        public UserRepository(DataContext context): base (context)
        {
            
        }
    }
}