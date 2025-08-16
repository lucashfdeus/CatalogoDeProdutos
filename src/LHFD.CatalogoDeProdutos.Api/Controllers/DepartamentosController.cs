using Asp.Versioning;
using LHFD.CatalogoDeProdutos.Business.Dtos;
using LHFD.CatalogoDeProdutos.Business.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LHFD.CatalogoDeProdutos.Api.Controllers
{
    [Authorize]
    [ApiVersion("1.0")]
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
