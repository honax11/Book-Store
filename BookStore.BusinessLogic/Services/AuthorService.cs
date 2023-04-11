using BookStore.BusinessLogic.Services.Interfaces;
using BookStore.BusinessLogic.Views;
using BookStore.DataAccess.Models;
using BookStore.DataAccess.Repositoris.Interfaces;

namespace BookStore.BusinessLogic.Services
{
    public class AuthorService : IAuthorService
    {
        public readonly IAuthorRepository _authorRepository;

        public AuthorService(IAuthorRepository authorRepository)
        {
            _authorRepository = authorRepository;
        }

        public async Task Create(CreateAuthorView view)
        {
            if (view == null)
            {
                throw new Exception("Author is not create");
            }
            var author = new Author();
            author.Id = view.Id;
            author.FirstName = view.FirstName;
            author.SecondName = view.SecondName;
            author.BirthDay = view.BirthDay;
            author.DayOfDeath = view.DayOfDeath;
            author.Ganres = view.Ganres;
            author.GanreId = view.GanreId;
            author.DescriptionOfGenre = view.DescriptionOfGenre;
            author.Products = view.Products;
            author.IsActive = true;

            await _authorRepository.Create(author);

        }

        public async Task Delete(string id)
        {
            var author = await _authorRepository.FindId(id);

            if (author == null)
            {
                throw new Exception("Author not found");
            }
            author.IsDeleted = true;

            await _authorRepository.Delete(author);
        }

        public async Task<Author> FindId(string id)
        {
            return await _authorRepository.FindId(id);
        }

        public async Task<IEnumerable<Author>> GetAll()
        {
            return await _authorRepository.GetAll();
        }

        public async Task Update(UpdateAuthorView view)
        {
            var update = await _authorRepository.FindId(view.Id);

            if(update == null)
            {
                throw new Exception ("Author not found");
            }
            update.FirstName = view.FirstName;
            update.SecondName = view.SecondName;
            update.BirthDay = view.BirthDay;
            update.DayOfDeath = view.DayOfDeath;
            
            

            await _authorRepository.Update(update);
        }
    }
}
