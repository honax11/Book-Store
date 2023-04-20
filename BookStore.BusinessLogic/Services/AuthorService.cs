using BookStore.BusinessLogic.Services.Interfaces;
using BookStore.BusinessLogic.Views;
using BookStore.DataAccess.Models;
using BookStore.DataAccess.Repositoris.Interfaces;

namespace BookStore.BusinessLogic.Services
{
    public class AuthorService : IAuthorService
    {
        public readonly IAuthorRepository _authorRepository;
        public readonly IGanreRepository _ganreRepository;

        public AuthorService(IAuthorRepository authorRepository, IGanreRepository ganreRepository)
        {
            _authorRepository = authorRepository;
            _ganreRepository = ganreRepository;
        }

        public async Task Create(CreateAuthorView view)
        {
            if (view == null)
            {
                throw new Exception("Author is not create");
            }
            var author = new Author();
            author.FirstName = view.FirstName;
            author.SecondName = view.SecondName;
            author.BirthDay = view.BirthDay;
            author.DayOfDeath = view.DayOfDeath;
            author.IsActive = true;

            //var ganres = await _ganreRepository.FindId(author.Id); 

            var ganresId = await _ganreRepository.ListGanreId(view.Ganres);

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

            await _authorRepository.Update(author);
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
            update.IsActive = view.IsActive;
            
            

            await _authorRepository.Update(update);
        }
    }
}
