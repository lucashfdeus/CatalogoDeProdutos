using MassTransit;

namespace LHFD.CatalogoDeProdutos.Api.Configurations
{
    public static class MassTransitConfig
    {
        public static IServiceCollection AddMassTransitConfiguration(this IServiceCollection services)
        {
            services.AddMassTransit(x =>
            {
                x.UsingRabbitMq((context, cfg) =>
                {
                    cfg.Host("localhost", "/", h =>
                    {
                        h.Username("guest");
                        h.Password("guest");
                    });
                });
            });

            return services;
        }
    }
}
