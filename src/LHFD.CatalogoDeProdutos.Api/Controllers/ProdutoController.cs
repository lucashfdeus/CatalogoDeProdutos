using Asp.Versioning;
using FluentValidation;
using LHFD.CatalogoDeProdutos.Business.Dtos;
using LHFD.CatalogoDeProdutos.Business.Dtos.Response;
using LHFD.CatalogoDeProdutos.Business.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LHFD.CatalogoDeProdutos.Api.Controllers
{
    //[Authorize]
    [ApiVersion("1.0")]
    [Route("produtos")]
    public class ProdutoController : MainController
    {
        private readonly IProdutoService _productService;

        private readonly IValidator<ProdutoRequestDto> _validator;

        public ProdutoController(INotification notification,
                                 IProdutoService productService, 
                                 IValidator<ProdutoRequestDto> validator) : base(notification)
        {
            _productService = productService;
            _validator = validator;
        }

        [HttpPost]
        public async Task<ActionResult<ProdutoRequestDto>> Create(ProdutoRequestDto model)
        {           
            var response = await CustomValidate(model, _validator);

            if (!ValidOperation()) return response;        

            await _productService.CreateProduct(model);

            return CustomResponse(model);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, ProdutoRequestDto model)
        {
            if (id != model.Id)
            {
                NotifyError("O Id do produto não confere com o Id da URL.");
                return CustomResponse(model);
            }

            var response = await CustomValidate(model, _validator);

            if (!ValidOperation()) return response;

            await _productService.UpdateProduct(model);

            return CustomResponse(model);
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<ProdutoResponseDto>> GetById(Guid id)
        {
            var produtodto = await _productService.GetProductById(id);

            if (!ValidOperation())
                return CustomResponse(produtodto);            

            return produtodto;
        }

        [HttpGet]
        public async Task<IEnumerable<ProdutoResponseDto>> GetAllProducts()
        {
            var response = await _productService.GetAllProducts();
            return response;
        }  

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var response = await _productService.DeleteProduct(id);

            if (response == false)            
                return CustomResponse(response);            

            var successResponse = new
            {
                Success = response,
                Message = "Produto apagado com sucesso."
            };

            return CustomResponse(successResponse);
        }
    }
}
