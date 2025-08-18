using LHFD.CatalogoDeProdutos.Business.Interfaces.Events;
using LHFD.CatalogoDeProdutos.Data.Messaging;
using MassTransit;

namespace LHFD.CatalogoDeProdutos.Api.Configurations
{
    public static class MassTransitConfig
    {
        public static IServiceCollection AddMassTransitConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddMassTransit(x =>
            {
                x.UsingRabbitMq((context, cfg) =>
                {
                    cfg.Host(configuration["RabbitMQ:HostName"], "/", h =>
                    {
                        h.Username(configuration["RabbitMQ:UserName"] ?? string.Empty);
                        h.Password(configuration["RabbitMQ:Password"] ?? string.Empty);
                    });
                });
            });

            services.AddScoped<IProdutoEventPublisher, ProdutoEventPublisher>();

            return services;
        }
    }
}