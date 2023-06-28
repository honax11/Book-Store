using BookStore.DataAccess.Data;
using BookStore.DataAccess.Models;
using BookStore.DataAccess.Repositoris.Interfaces;

namespace BookStore.DataAccess.Repositoris.EFCoreRepositories
{
    public class UserRepository : GenericEFCoreRepository<User>, IUsersRepository
    {
        public UserRepository(DataContext context) : base(context)
        {

        }
    }
}