using LHFD.CatalogoDeProdutos.Business.Events;
using LHFD.CatalogoDeProdutos.EventConsumer.Consumers;
using MassTransit;

namespace LHFD.CatalogoDeProdutos.EventConsumer.Configurations
{
    public static class MassTransitConfig
    {
        public static IServiceCollection AddMassTransitConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            var rabbitMqConfig = configuration.GetSection("RabbitMQ");

            services.AddMassTransit(x =>
            {
                x.AddConsumer<ProdutoCriadoConsumer>();

                x.UsingRabbitMq((context, cfg) =>
                {
                    cfg.Host(rabbitMqConfig["HostName"], "/", h =>
                    {
                        cfg.UseMessageRetry(r => r.Interval(30, TimeSpan.FromSeconds(10)));

                        h.Username(rabbitMqConfig["UserName"] ?? string.Empty);
                        h.Password(rabbitMqConfig["Password"] ?? string.Empty);
                    });

                    cfg.ReceiveEndpoint("produtos-criados-consumer-queue", e =>
                    {
                        e.ConfigureConsumer<ProdutoCriadoConsumer>(context);
                        e.Bind<IProdutoCriadoEvent>();
                    });

                    cfg.ConfigureEndpoints(context);
                    cfg.UseMessageRetry(r => r.Interval(5, TimeSpan.FromSeconds(5)));

                });
            });

            return services;
        }
    }
}