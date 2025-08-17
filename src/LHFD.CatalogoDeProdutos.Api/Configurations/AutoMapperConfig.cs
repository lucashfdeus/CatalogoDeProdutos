using LHFD.CatalogoDeProdutos.Business.Automapper;

namespace LHFD.CatalogoDeProdutos.Api.Configurations
{
    public static class AutoMapperConfig
    {
        public static IServiceCollection AddAutoMapperConfiguration(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(ProdutoAutomapper));
            return services;
        }

    }
}
