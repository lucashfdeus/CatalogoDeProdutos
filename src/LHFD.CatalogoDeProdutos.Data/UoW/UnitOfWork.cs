using LHFD.CatalogoDeProdutos.Business.Interfaces;
using LHFD.CatalogoDeProdutos.Data.Context;

namespace LHFD.CatalogoDeProdutos.Data.UoW
{
    public class UnitOfWork(CatalogoDeProdutosDbContext context) : IUnitOfWork
    {
        private readonly CatalogoDeProdutosDbContext _context = context;

        public async Task<bool> Commit()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
