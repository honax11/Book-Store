using BookStore.DataAccess.Data;
using BookStore.DataAccess.Models;
using BookStore.DataAccess.Repositoris.EFCoreRepositories;
using BookStore.DataAccess.Repositoris.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Data.SqlClient;

namespace BookStore.DataAccess.Repositoris.DapperRepositories
{
    public abstract class GenericDapperRepository<TEntity> : IGenericRepository<TEntity> where TEntity : BaseEntity
    {
        public GenericEFCoreRepository coreRepository;

        string connectionString = null;

        public GenericDapperRepository(string conn)
        {
            connectionString = conn;

        }
        public async Task Create(TEntity item)
        {
           using (IDbConnection db = new SqlConnection(connectionString))
            {
                var sqlQuery = "INSERT INTO TEntity VALUES ";
                db.Execute(sqlQuery, item);
            }

        }

        public async Task Delete(TEntity item)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var sqlQuery = "DELETE FROM Users WHERE Id = @id";
                db.Execute(sqlQuery, new { id });
            }
        }

        public async Task<TEntity> FindId(string id)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                return db.Query<TEntity>("SELECT * FROM TEntity WHERE Id = @id", new { id }).FirstOrDefault();
            }
        }

        public async Task<IEnumerable<TEntity>> GetAll()
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                return db.Query<TEntity>("SELECT * FROM TEntity").ToList();
            }
        }

        public async Task Update(TEntity item)
        {
           
        }
    }
}

