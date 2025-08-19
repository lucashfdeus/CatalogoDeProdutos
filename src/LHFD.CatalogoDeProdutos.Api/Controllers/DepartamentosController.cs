using Asp.Versioning;
using LHFD.CatalogoDeProdutos.Business.Dtos;
using LHFD.CatalogoDeProdutos.Business.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LHFD.CatalogoDeProdutos.Api.Controllers
{
    [Authorize]
    [ApiVersion("1.0")]
    [Route("departamentos")]
    public class DepartamentosController : MainController
    {
        private readonly IDepartamentoService _departamentoService;

        public DepartamentosController(INotification notification,
                                       IDepartamentoService departamentoService) : base(notification)
        {
            _departamentoService = departamentoService;
        }

        [HttpGet]
        public async Task<IEnumerable<DepartamentoDto>> GetAll()
        {
           return await _departamentoService.GetAllDepartamentosAsync();
        }
    }
}
