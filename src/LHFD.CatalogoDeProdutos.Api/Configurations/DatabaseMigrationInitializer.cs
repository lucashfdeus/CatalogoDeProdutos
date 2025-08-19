using LHFD.CatalogoDeProdutos.Api.Data;
using LHFD.CatalogoDeProdutos.Business.Entities;
using LHFD.CatalogoDeProdutos.Data.Context;
using Microsoft.EntityFrameworkCore;
using System;

namespace LHFD.CatalogoDeProdutos.Api.Configurations
{
    public static class MigrationConfig
    {
        public static void ApplyMigrations(this WebApplication app)
        {
            using var scope = app.Services.CreateScope();

            var catalogoContext = scope.ServiceProvider.GetRequiredService<CatalogoDeProdutosDbContext>();
            catalogoContext.Database.Migrate();
            SeedData.Initialize(catalogoContext);

            var identityContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            identityContext.Database.Migrate();
        }
    }

    public static class SeedData
    {
        public static void Initialize(CatalogoDeProdutosDbContext context)
        {
            if (!context.Departamentos.Any())
            {
                context.Departamentos.AddRange(
                    new Departamento { Nome = "Eletrônicos" },
                    new Departamento { Nome = "Roupas" },
                    new Departamento { Nome = "Alimentos" },
                    new Departamento { Nome = "Móveis" }
                );
                context.SaveChanges();
            }
        }
    }
}
