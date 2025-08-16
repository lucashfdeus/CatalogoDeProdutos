using LHFD.CatalogoDeProdutos.Business.Dtos;

namespace LHFD.CatalogoDeProdutos.Business.Interfaces
{
    public interface IDepartamentoService
    {
        Task<IEnumerable<DepartamentoDto>> GetAllDepartamentosAsync();
    }
}
