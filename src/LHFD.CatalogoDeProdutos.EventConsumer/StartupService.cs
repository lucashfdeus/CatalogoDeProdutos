namespace LHFD.CatalogoDeProdutos.EventConsumer
{
    public class StartupService : IHostedService
    {
        private readonly ILogger<StartupService> _logger;

        public StartupService(ILogger<StartupService> logger)
        {
            _logger = logger;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Configurando consumidores...");

            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
    }
}
