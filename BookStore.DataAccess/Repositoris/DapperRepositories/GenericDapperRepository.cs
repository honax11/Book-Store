using BookStore.DataAccess.Data;
using BookStore.DataAccess.Models;
using BookStore.DataAccess.Repositoris.Interfaces;
using Dapper;
using Dapper.Contrib.Extensions;
using Microsoft.AspNetCore.Mvc;
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
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        protected IDbConnection CreateConnection() => new SqlConnection(_connectionString);

        public GenericDapperRepository (IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("DefaultConnection");
        }

        public async Task Create(TEntity item)
        { 
            using (var connection = CreateConnection())
            {
                await connection.InsertAsync<TEntity>(item);
            }
        }

        public async Task Delete(TEntity item)
        {
            using (var connection = CreateConnection())
            {
                await connection.DeleteAsync<TEntity>(item);
            }
        }
    
        public async Task<TEntity> FindId(string id)
        {
            using (var connection = CreateConnection())
            {
                var result = await connection.QuerySingleOrDefaultAsync<TEntity>(id);

                return result;
            }
        }

        public async Task<IEnumerable<TEntity>> GetAll()
        {
            using (var connection = CreateConnection())
            {
              var result = await connection.GetAllAsync<TEntity>();

              return result;
                
            }
        }

        public async Task Update(TEntity item)
        {
            using (var connection = CreateConnection())
            {
                await connection.UpdateAsync<TEntity>(item);
            }
        }
    }
}

