using AutoMapper;
using LHFD.CatalogoDeProdutos.Business.Dtos;
using LHFD.CatalogoDeProdutos.Business.Dtos.Response;
using LHFD.CatalogoDeProdutos.Business.Entities;
using LHFD.CatalogoDeProdutos.Business.Interfaces;

namespace LHFD.CatalogoDeProdutos.Business.Services
{
    public class ProdutoService : BaseService, IProdutoService
    {
        private readonly IMapper _mapper;
        private readonly IProdutoRepository _productRepository;

        public ProdutoService(INotification notification, IUnitOfWork uow,
                              IMapper mapper,
                              IProdutoRepository productRepository) : base(notification, uow)
        {
            _mapper = mapper;
            _productRepository = productRepository;
        }

        public async Task CreateProduct(ProdutoRequestDto model)
        {
            var produto = _mapper.Map<Produto>(model);

            var produtosExistentes = await _productRepository.GetProdutoExistente(produto.Id, produto.Codigo);

            if (produtosExistentes.Any())
            {
                var codigos = string.Join(", ", produtosExistentes.Select(p => p.Codigo));

                Notify($"Já existem produtos com os seguintes códigos: {codigos}");
                return;
            }

            await _productRepository.CreateAsync(produto);
        }

        public async Task UpdateProduct(ProdutoRequestDto model)
        {
            var produto = _mapper.Map<Produto>(model);

            var produtoExistente = await _productRepository.GetByIdAsync(produto.Id);

            if (produtoExistente is null)
            {
                Notify($"Produto código: {model.Id} - {model.Codigo}, não encontrado.");
                return;
            }

            await _productRepository.UpdateAsync(produto);
        }

        public async Task<ProdutoResponseDto> GetProductById(Guid id)
        {
            var produto = await _productRepository.GetByIdWithDepartamentoAsync(id);

            if (produto is null)
            {
                Notify("Produto não encontrado.");
                return new();
            }

            return _mapper.Map<ProdutoResponseDto>(produto);
        }

        public async Task<IEnumerable<ProdutoResponseDto>> GetAllProducts()
        {
            var produtos = await _productRepository.GetAllWithDepartamentoAsync();
            return _mapper.Map<IEnumerable<ProdutoResponseDto>>(produtos);
        }

        public async Task<bool> DeleteProduct(Guid id)
        {
            var produto = await _productRepository.GetByIdAsync(id);

            if (produto is null)
            {
                Notify("Produto não encontrado.");
                return false;
            }

            if (produto.Status == false)
            {
                Notify("Produto já está inativo.");
                return false;
            }

            produto.Status = false;

            await _productRepository.UpdateAsync(produto);

            return true;
        }

        public void Dispose() => _productRepository.Dispose();
    }
}
