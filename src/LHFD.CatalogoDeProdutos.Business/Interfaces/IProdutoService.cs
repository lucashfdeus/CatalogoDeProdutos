using LHFD.CatalogoDeProdutos.Business.Dtos;
using LHFD.CatalogoDeProdutos.Business.Dtos.Response;

namespace LHFD.CatalogoDeProdutos.Business.Interfaces
{
    public interface IProdutoService : IDisposable
    {
        Task CreateProduct(ProdutoRequestDto model);
        Task UpdateProduct(ProdutoRequestDto model);
        Task<ProdutoResponseDto> GetProductById(Guid id);
        Task<IEnumerable<ProdutoResponseDto>> GetAllProducts();
        Task<bool> DeleteProduct(Guid id);
    }
}
