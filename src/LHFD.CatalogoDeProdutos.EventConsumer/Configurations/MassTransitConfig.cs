using LHFD.CatalogoDeProdutos.Business.Events;
using LHFD.CatalogoDeProdutos.EventConsumer.Consumers;
using MassTransit;

namespace LHFD.CatalogoDeProdutos.EventConsumer.Configurations
{
    public static class MassTransitConfig
    {
        public static IServiceCollection AddMassTransitConfiguration(this IServiceCollection services)
        {
            services.AddMassTransit(x =>
            {
                x.AddConsumer<ProdutoCriadoConsumer>();

                x.UsingRabbitMq((context, cfg) =>
                {
                    cfg.Host("localhost", "/", h =>
                    {
                        h.Username("guest");
                        h.Password("guest");
                    });

                    cfg.ReceiveEndpoint("produtos-criados-consumer-queue", e =>
                    {
                        e.ConfigureConsumer<ProdutoCriadoConsumer>(context);
                        e.Bind<IProdutoCriadoEvent>();
                    });

                });
            });

            return services;
        }
    }
}