using BookStore.DataAccess.Data;
using BookStore.DataAccess.Models;
using BookStore.DataAccess.Repositoris.Interfaces;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace BookStore.DataAccess.Repositoris.DapperRepositories
{
    public class AuthorDapperRepository : GenericDapperRepository<Author>, IAuthorRepository
    {
        private readonly IConfiguration _configuration;

        public AuthorDapperRepository(IConfiguration configuration) : base(configuration)
        {
            _configuration = configuration;
        }

        public Task<List<Author>> GetAllActive()
        {
            throw new NotImplementedException();
        }

        public Task<List<Author>> ListGetAll()
        {
            throw new NotImplementedException();
        }
    }
}
