using LHFD.CatalogoDeProdutos.Business.Dtos;
using LHFD.CatalogoDeProdutos.Business.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LHFD.CatalogoDeProdutos.Api.Controllers
{
    public class DepartamentosController : MainController
    {
        private readonly IDepartamentoService _departamentoService;

        public DepartamentosController(IDepartamentoService departamentoService)
        {
            _departamentoService = departamentoService;
        }

        [HttpGet]
        [Route("departamentos")]
        public async Task<IEnumerable<DepartamentoDto>> GetAll()
        {
           return await _departamentoService.GetAllDepartamentosAsync();
        }
    }
}
