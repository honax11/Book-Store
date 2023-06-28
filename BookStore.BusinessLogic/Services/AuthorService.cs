using BookStore.BusinessLogic.Services.Interfaces;
using BookStore.BusinessLogic.Views;
using BookStore.DataAccess.Models;
using BookStore.DataAccess.Repositoris.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Security.Cryptography;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace BookStore.BusinessLogic.Services
{
    public class AuthorService : IAuthorService
    {
        public readonly IAuthorRepository _authorRepository;
        public readonly IGanreRepository _ganreRepository;
        public readonly IProductRepository _productRepository;

        public AuthorService(IAuthorRepository authorRepository, IGanreRepository ganreRepository, IProductRepository productRepository)
        {
            _authorRepository = authorRepository;
            _ganreRepository = ganreRepository;
            _productRepository = productRepository;
        }

        public async Task Create(CreateAuthorView view)
        {
            if (view == null)
            {
                throw new Exception("Author is not create");
            }
            Author author = new Author();
            author.FirstName = view.FirstName;
            author.SecondName = view.SecondName;
            author.BirthDay = view.BirthDay;
            author.DayOfDeath = view.DayOfDeath;
            author.IsActive = true;

            List<Ganre> listGanre = await _ganreRepository.ListGanreId(view.Ganres);

            author.Ganres = listGanre;

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

            return await _authorRepository.ListGetAll();
        }

        public async Task Update(UpdateAuthorView view)
        {
            var update = await _authorRepository.FindId(view.Id);

            if (update == null)
            {
                throw new Exception("Author not found");
            }
            update.FirstName = view.FirstName;
            update.SecondName = view.SecondName;
            update.BirthDay = view.BirthDay;
            update.DayOfDeath = view.DayOfDeath;
            update.IsActive = view.IsActive;

            List<Ganre> ganres = await _ganreRepository.ListGanreId(view.Ganres);

            update.Ganres = ganres;

            await _authorRepository.Update(update);
        }

        public async Task AddGanre(string authorId, string ganreId)
        {
            var author = await _authorRepository.FindId(authorId);

            if (author == null)
            {
                throw new Exception("");
            }

            var ganre = await _ganreRepository.FindId(ganreId);

            if (ganre == null)
            {
                throw new Exception("");
            }

            author.Ganres.Add(ganre);

            await _authorRepository.Update(author);
        }
    }
}
