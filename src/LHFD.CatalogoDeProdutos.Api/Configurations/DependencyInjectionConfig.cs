using LHFD.CatalogoDeProdutos.Business.Interfaces;
using LHFD.CatalogoDeProdutos.Business.Services;
using LHFD.CatalogoDeProdutos.Data.Context;
using LHFD.CatalogoDeProdutos.Data.Repository;

namespace LHFD.CatalogoDeProdutos.Api.Configurations
{
    public static class DependencyInjectionConfig
    {
        public static IServiceCollection ResolveDependencies(this IServiceCollection services)
        {
            services.AddScoped<CatalogoDeProdutosDbContext>();

            services.AddScoped<IDepartamentoRepository, DepartamentoRepository>();
            services.AddScoped<IProdutoRepository, ProdutoRepository>();

            services.AddScoped<IDepartamentoService, DepartamentoService>();

            return services;
        }
    }
}
