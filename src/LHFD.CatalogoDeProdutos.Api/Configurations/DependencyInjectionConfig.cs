using LHFD.CatalogoDeProdutos.Api.Extensions;
using LHFD.CatalogoDeProdutos.Business.Interfaces;
using LHFD.CatalogoDeProdutos.Business.Interfaces.Events;
using LHFD.CatalogoDeProdutos.Business.Notification;
using LHFD.CatalogoDeProdutos.Business.Services;
using LHFD.CatalogoDeProdutos.Data.Context;
using LHFD.CatalogoDeProdutos.Data.Messaging;
using LHFD.CatalogoDeProdutos.Data.Repository;
using LHFD.CatalogoDeProdutos.Data.UoW;

namespace LHFD.CatalogoDeProdutos.Api.Configurations
{
    public static class DependencyInjectionConfig
    {
        public static IServiceCollection ResolveDependencies(this IServiceCollection services)
        {
            services.AddScoped<CatalogoDeProdutosDbContext>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            services.AddScoped<IDepartamentoRepository, DepartamentoRepository>();
            services.AddScoped<IProdutoRepository, ProdutoRepository>();

            services.AddScoped<INotification, AppNotifier>();
            services.AddScoped<IDepartamentoService, DepartamentoService>();
            services.AddScoped<IProdutoService, ProdutoService>();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<IUser, AppUser>();

            services.AddScoped<IProdutoEventPublisher, ProdutoEventPublisher>();

            return services;
        }
    }
}
