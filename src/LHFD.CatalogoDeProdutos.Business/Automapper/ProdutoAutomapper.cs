using AutoMapper;
using LHFD.CatalogoDeProdutos.Business.Dtos;
using LHFD.CatalogoDeProdutos.Business.Dtos.Response;
using LHFD.CatalogoDeProdutos.Business.Entities;

namespace LHFD.CatalogoDeProdutos.Business.Automapper
{
    public class ProdutoAutomapper : Profile
    {
        public ProdutoAutomapper()
        {
            CreateMap<Produto, ProdutoRequestDto>().ReverseMap();

            CreateMap<Produto, ProdutoResponseDto>()
           .ForMember(dest => dest.Departamento,
               opt => opt.MapFrom(src => GetDepartamentoNome(src.Departamento)));
        }

        private static string GetDepartamentoNome(Departamento? departamento)
        {
            return string.IsNullOrWhiteSpace(departamento?.Nome) ? string.Empty : departamento.Nome;
        }
    }
}