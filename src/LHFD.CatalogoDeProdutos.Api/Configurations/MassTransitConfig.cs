using LHFD.CatalogoDeProdutos.Business.Interfaces.Events;
using LHFD.CatalogoDeProdutos.Data.Messaging;
using MassTransit;

namespace LHFD.CatalogoDeProdutos.Api.Configurations
{
    public static class MassTransitConfig
    {
        public static IServiceCollection AddMassTransitConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            var rabbitMqConfig = configuration.GetSection("RabbitMQ");

            services.AddMassTransit(x =>
            {
                x.UsingRabbitMq((context, cfg) =>
                {

                    cfg.Host(rabbitMqConfig["HostName"], "/", h =>
                    {
                        h.Username(rabbitMqConfig["UserName"] ?? string.Empty);
                        h.Password(rabbitMqConfig["Password"] ?? string.Empty);
                    });
                });
            });

            services.AddScoped<IProdutoEventPublisher, ProdutoEventPublisher>();

            return services;
        }
    }
}