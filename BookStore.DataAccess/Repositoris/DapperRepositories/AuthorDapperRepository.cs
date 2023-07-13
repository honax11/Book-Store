using BookStore.DataAccess.Data;
using BookStore.DataAccess.Models;
using BookStore.DataAccess.Repositoris.Interfaces;
using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore.DataAccess.Repositoris.DapperRepositories
{
    public class AuthorDapperRepository : GenericDapperRepository<Author>, IAuthorRepository
    {
        private readonly DapperContext _dapperContext;

        public AuthorDapperRepository(DapperContext dapperContext) : base(dapperContext)
        {
            _dapperContext = dapperContext;
        }

        async Task<IEnumerable<Author>> IAuthorRepository.GetCompanies()
        {
            var query = "SELECT * FROM Author";

            using (var connection = _dapperContext.CreateConnection())
            {
                var companies = await connection.QueryAsync<Author>(query);
                return companies.ToList();
            }
        }

        Task<List<Author>> IAuthorRepository.ListGetAll()
        {
            throw new NotImplementedException();
        }
    }
}
