using BookStore.BusinessLogic.Views;
using BookStore.DataAccess.Models;
using BookStore.DataAccess.Repositoris.Interfaces;

namespace BookStore.BusinessLogic.Services
{
    public class GanreService : IGanreService
    {
        private readonly IGanreRepository _ganre;
        private readonly IAuthorRepository _authorRepository;

        public GanreService(IGanreRepository ganre, IAuthorRepository authorRepository)
        {
            _ganre = ganre;
            _authorRepository = authorRepository;
        }

        public async Task Create(CreateGanreView view)
        {
            if (view == null)
            {
                throw new Exception("Ganre not create");
            }

            Ganre ganre = new Ganre();
            ganre.Name = view.Name;
            ganre.Description = view.Description;
            ganre.IsActive = true;


            await _ganre.Create(ganre);
        }

        public async Task<IEnumerable<Ganre>> GetAll()
        {
            return await _ganre.GetAll();
        }
        public async Task Delete(string id)
        {
            var ganre = await _ganre.FindId(id);

            if (ganre == null)
            {
                throw new Exception("Ganre not found");
            }
            ganre.IsDeleted = true;
            await _ganre.Update(ganre);

        }

        public async Task<Ganre> FindId(string id)
        {
            return await _ganre.FindId(id);
        }

        public async Task Update(UpdateGanreView view)
        {
            var update = await _ganre.FindId(view.Id);

            if (update == null)
            {
                throw new Exception("Genre not found");
            }
            update.Name = view.Name;
            update.Description = view.Description;
            update.IsActive = view.IsActive;

            await _ganre.Update(update);
        }
    }
}