
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
            var product =  await _ganre.FindId(id);

            if(product==null)
            {
                throw new Exception("Ganre not finde");
            }
            await _ganre.Delete(product);

        }

        public async Task<Ganre> FindId(string id)
        {
            return await _ganre.FindId(id); 
        }

        public Task Update()
        {
            throw new NotImplementedException();
        }
    }
}