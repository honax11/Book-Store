using BookStore.DataAccess.Data;
using BookStore.DataAccess.Models;
using BookStore.DataAccess.Repositoris.Interfaces;
using Dapper;
using Dapper.Contrib.Extensions;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Reflection;
using static Dapper.SqlMapper;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using static System.Reflection.Metadata.BlobBuilder;


namespace BookStore.DataAccess.Repositoris.DapperRepositories
{

    public abstract class GenericDapperRepository<TEntity> : IGenericRepository<TEntity> where TEntity : BaseEntity
    {
        private readonly DapperContext _dapperContext;

        public GenericDapperRepository (DapperContext dapperContext)
        {
            _dapperContext = dapperContext;
        }

        public async Task Create(TEntity item)
        {
            var querty = "INSERT INTRO  VALUES";

            List<TEntity> items = new List<TEntity>();

            using (var connection = _dapperContext.CreateConnection())
            {

                await connection.ExecuteAsync(querty, items);

            }
        }

        public async Task Delete(TEntity item)
        {
            using (var connection = _dapperContext.CreateConnection())
            {
                await connection.DeleteAsync<TEntity>(item);
                //await connection.ExecuteAsync($"DELETE FROM {_tableName} WHERE Id=@Id", new { Id = item });
            }
        }
    

        public async Task<TEntity> FindId(string id)
        {
            var query = "SELECT * FROM {TEntity} WHERE Id = @Id";

            using (var connection = _dapperContext.CreateConnection())
            {
                var result = await connection.QuerySingleOrDefaultAsync<TEntity>(query, new { id });
                if (result == null)
                    throw new KeyNotFoundException($" with id [{id}] could not be found.");

                return result;
            }
        }

        public async Task<IEnumerable<TEntity>> GetAll()
        {
            var querty = "SELECT * FROM ";
            using (var connection = _dapperContext.CreateConnection())
            {
                var db = await connection.QueryAsync<TEntity>(querty);

                return db.ToList();
            }
        }

        public async Task Update(TEntity item)
        {
            using (var connection = _dapperContext.CreateConnection())
            {
                List<TEntity> items = new List<TEntity>();
                await connection.UpdateAsync<List<TEntity>>(items);
            }
        }
    }
}

