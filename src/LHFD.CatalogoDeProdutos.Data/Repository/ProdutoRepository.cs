using LHFD.CatalogoDeProdutos.Data.Context;
using LHFD.ProductCatalog.Business.Entities;
using LHFD.ProductCatalog.Business.Interfaces;

namespace LHFD.CatalogoDeProdutos.Data.Repository
{
    public class ProdutoRepository : Repository<Produto>, IProdutoRepository
    {
        public ProdutoRepository(CatalogoDeProdutosDbContext context) : base(context) { }     
    }
}