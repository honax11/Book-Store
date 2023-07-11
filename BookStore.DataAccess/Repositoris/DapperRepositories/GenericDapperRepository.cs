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
        private readonly string _tableName;
        private readonly IConfiguration _configuration;

        public GenericDapperRepository (string tableName, IConfiguration configuration)
        {
            _tableName = tableName;
            _configuration = configuration;
        }
        /// <summary>
        /// This method adds a new product to the database using Dapper
        /// </summary>
        /// <param name="entity"></param>
        /// <returns>int</returns>

        public async Task Create(TEntity item)
        {
            using (IDbConnection db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                List<TEntity> items = new List<TEntity>();
                db.InsertAsync<List<TEntity>>(items);

            }
        }

        public async Task Delete(TEntity item)
        {
            using (IDbConnection db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await db.DeleteAsync<TEntity>(item);
                //await connection.ExecuteAsync($"DELETE FROM {_tableName} WHERE Id=@Id", new { Id = item });
            }
        }
    

        public async Task<TEntity> FindId(string id)
        {
            using (IDbConnection db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                var result = await db.QuerySingleOrDefaultAsync($"SELECT * FROM {_tableName} WHERE Id=@Id", new { Id = id });
                if (result == null)
                    throw new KeyNotFoundException($"{_tableName} with id [{id}] could not be found.");

                return result;
            }
        }

        public async Task<IEnumerable<TEntity>> GetAll()
        {
            using (IDbConnection db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                return await db.QueryAsync<TEntity>($"SELECT * FROM {_tableName}");
            }
        }

        public async Task Update(TEntity item)
        {
            using (IDbConnection db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                List<TEntity> items = new List<TEntity>();
                await db.UpdateAsync<List<TEntity>>(items);
            }
        }
    }
}

