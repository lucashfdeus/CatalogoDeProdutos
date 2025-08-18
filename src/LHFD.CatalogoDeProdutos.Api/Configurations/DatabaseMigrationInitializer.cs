using LHFD.CatalogoDeProdutos.Api.Data;
using LHFD.CatalogoDeProdutos.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace LHFD.CatalogoDeProdutos.Api.Configurations
{
    public static class MigrationConfig
    {
        public static void ApplyMigrations(this WebApplication app)
        {
            using var scope = app.Services.CreateScope();

            var catalogoContext = scope.ServiceProvider.GetRequiredService<CatalogoDeProdutosDbContext>();
            catalogoContext.Database.Migrate();

            var identityContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            identityContext.Database.Migrate();
        }
    }
}
