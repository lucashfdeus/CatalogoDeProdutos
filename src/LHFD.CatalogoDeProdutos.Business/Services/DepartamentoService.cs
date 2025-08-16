using LHFD.CatalogoDeProdutos.Business.Dtos;
using LHFD.CatalogoDeProdutos.Business.Interfaces;

namespace LHFD.CatalogoDeProdutos.Business.Services
{
    public class DepartamentoService : IDepartamentoService
    {
        private readonly IDepartamentoRepository _departamentoRepository;

        public DepartamentoService(IDepartamentoRepository departamentoRepository)
        {
            _departamentoRepository = departamentoRepository;
        }

        public async Task<IEnumerable<DepartamentoDto>> GetAllDepartamentosAsync()
        {
            var departamentos = await _departamentoRepository.GetAll();

            var departamentoDtos = departamentos.Select(d => new DepartamentoDto
            {
                Id = d.IdDepartamento,
                Nome = d.Nome
            });

            return departamentoDtos;
        }
    }
}
