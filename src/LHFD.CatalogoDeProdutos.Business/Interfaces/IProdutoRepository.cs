using LHFD.CatalogoDeProdutos.Business.Entities;

namespace LHFD.CatalogoDeProdutos.Business.Interfaces
{
    public interface IProdutoRepository : IRepository<Produto> 
    {
        Task<IEnumerable<Produto>> GetProdutoExistente(Guid id, string codigo);

        Task<IEnumerable<Produto>> GetAllWithDepartamentoAsync();

        Task<Produto?> GetByIdWithDepartamentoAsync(Guid id);
    };
}