using LHFD.CatalogoDeProdutos.Business.Entities;
using LHFD.CatalogoDeProdutos.Business.Interfaces;
using LHFD.CatalogoDeProdutos.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace LHFD.CatalogoDeProdutos.Data.Repository
{
    public class ProdutoRepository : Repository<Produto>, IProdutoRepository
    {
        public ProdutoRepository(CatalogoDeProdutosDbContext context) : base(context) { }

        public async Task<IEnumerable<Produto>> GetProdutoExistente(Guid id, string codigo)
        {
            return await GetAsync(p => p.Id == id && p.Codigo == codigo);
        }

        public async Task<IEnumerable<Produto>> GetAllWithDepartamentoAsync(int page = 1, int pageSize = 100)
        {
            if (page < 1) page = 1;
            if (pageSize < 1) pageSize = 100;

            return await Db.Produtos
                .AsNoTracking()
                .AsSplitQuery()
                .Include(p => p.Departamento)
                .OrderBy(p => p.IdDepartamento)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task<Produto?> GetByIdWithDepartamentoAsync(Guid id)
        {
            return await Db.Produtos
                .AsNoTracking()
                .AsSplitQuery()
                .Include(p => p.Departamento)
                .FirstOrDefaultAsync(p => p.Id == id);
        }
    }
}