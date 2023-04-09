
using BookStore.BusinessLogic.Views;
using BookStore.DataAccess.Models;
using BookStore.DataAccess.Repositoris.Interfaces;

namespace BookStore.BusinessLogic.Services
{
    public class GanreService: IGanreService
    {
        private readonly IGanreRepository _ganre;

        public GanreService (IGanreRepository ganre)
        {
            _ganre = ganre;
        }

         public async Task Create(CreateGanreView view)
        {
            if (view == null)
            {
                throw new Exception ("Ganre not create");
            }

            var ganre = new Ganre();
            ganre.Id = view.Id;
            ganre.Name = view.Name;
            ganre.GanreId = view.GanreId;

          await _ganre.Create(ganre);
        }

        public async Task<IEnumerable<Ganre>> GetAll()
        {
            return await _ganre.GetAll();
        } 
        public async Task Delete(string id)
        {
            var detete =  await _ganre.FindId(id);

            if(detete==null)
            {
                throw new Exception("Ganre not finde");
            }
            await _ganre.Delete(detete);

        }

        public async Task<Ganre> FindId(string id)
        {
            return await _ganre.FindId(id); 
        }

        public async Task Update(UpdateGanreView view)
        {
            var update = await _ganre.FindId(view.Id);

            if(update == null)
            {
                throw new Exception ("Ganre not finde");
            }
            update.Name = view.Name;
            update.GanreId = view.GanreId;

            await _ganre.Update(update);
        }
    }
}