using LHFD.CatalogoDeProdutos.Business.Entities;

namespace LHFD.CatalogoDeProdutos.Business.Interfaces
{
    public interface IDepartamentoRepository
    {
        Task<List<Departamento>> GetAllAsync();
        Task<Departamento?> GetByIdAsync(int id);
    }
}
