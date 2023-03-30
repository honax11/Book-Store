using BookStore.DataAccess.Data;
using BookStore.DataAccess.Models;
using BookStore.DataAccess.Repositoris.Interfaces;

namespace BookStore.DataAccess.Repositoris
{
    public class BookRepository: GenericRepository<Book>, IBookRepository
    {
        public BookRepository(DataContext contex): base (contex)
        {

        }
    }
}