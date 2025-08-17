using LHFD.CatalogoDeProdutos.EventConsumer;
using LHFD.CatalogoDeProdutos.EventConsumer.Configurations;

var builder = Host.CreateApplicationBuilder(args);

builder.Services.AddHostedService<StartupService>();

builder.Services.AddMassTransitConfiguration();

var host = builder.Build();
host.Run();