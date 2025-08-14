using LHFD.ProductCatalog.Business.Interfaces;
using LHFD.ProductCatalog.Data.Context;

namespace LHFD.ProductCatalog.Data.UoW
{
    public class UnitOfWork(ProductCatalogDbContext context) : IUnitOfWork
    {
        private readonly ProductCatalogDbContext _context = context;

        public async Task<bool> Commit()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
