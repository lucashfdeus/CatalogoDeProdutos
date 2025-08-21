using LHFD.CatalogoDeProdutos.Business.Entities;
using Microsoft.EntityFrameworkCore;

namespace LHFD.CatalogoDeProdutos.Data.Context
{
    public class CatalogoDeProdutosDbContext : DbContext
    {
        public CatalogoDeProdutosDbContext(DbContextOptions<CatalogoDeProdutosDbContext> options) : base(options)
        {
            ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
            ChangeTracker.AutoDetectChangesEnabled = false;
        }

        public DbSet<Departamento> Departamentos { get; set; }
        public DbSet<Produto> Produtos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var property in modelBuilder.Model.GetEntityTypes()
                .SelectMany(e => e.GetProperties()
                    .Where(p => p.ClrType == typeof(string))))
                property.SetColumnType("varchar(100)"); //Validação global para propriedades string

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(CatalogoDeProdutosDbContext).Assembly);

            modelBuilder.Entity<Produto>().HasQueryFilter(p => !p.IsDeleted);

            base.OnModelCreating(modelBuilder);
        }
    }
}
