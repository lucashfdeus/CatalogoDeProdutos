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

        public async Task<IEnumerable<Produto>> GetAllWithDepartamentoAsync()
        {
            return await Db.Produtos
                .Include(p => p.Departamento)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Produto?> GetByIdWithDepartamentoAsync(Guid id)
        {
            return await Db.Produtos
                .Where(p => p.Id == id)
                .Include(p => p.Departamento)
                .AsNoTracking()
                .FirstOrDefaultAsync();

        }
    }
}