using LHFD.CatalogoDeProdutos.Business.Dtos;
using LHFD.CatalogoDeProdutos.Business.Interfaces;

namespace LHFD.CatalogoDeProdutos.Business.Services
{
    public class DepartamentoService(IDepartamentoRepository departamentoRepository) : IDepartamentoService
    {
        private readonly IDepartamentoRepository _departamentoRepository = departamentoRepository;

        public async Task<IEnumerable<DepartamentoDto>> GetAllDepartamentosAsync()
        {
            var departamentos = await _departamentoRepository.GetAllAsync();

            var departamentoDtos = departamentos.Select(d => new DepartamentoDto
            {
                Id = d.Id,
                Nome = d.Nome
            });

            return departamentoDtos;
        }
    }
}
