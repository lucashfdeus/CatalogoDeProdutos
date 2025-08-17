using FluentValidation;
using LHFD.CatalogoDeProdutos.Business.Dtos;
using LHFD.CatalogoDeProdutos.Business.Dtos.Validations;
using LHFD.CatalogoDeProdutos.Business.Entities;
using LHFD.CatalogoDeProdutos.Business.Entities.Validations;

namespace LHFD.CatalogoDeProdutos.Api.Configurations
{
    public static class ValidationConfig
    {
        public static IServiceCollection AddValidationConfiguration(this IServiceCollection services)
        {
            services.AddScoped<IValidator<ProdutoRequestDto>, ProdutoRequestDtoValidation>();

            services.AddScoped<IValidator<Produto>, ProdutoValidation>();

            return services;
        }
    }
}
