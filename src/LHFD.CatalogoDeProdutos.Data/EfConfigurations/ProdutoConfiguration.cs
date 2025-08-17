using LHFD.CatalogoDeProdutos.Business.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LHFD.CatalogoDeProdutos.Data.EfConfigurations
{
    public class ProdutoConfiguration : IEntityTypeConfiguration<Produto>
    {
        public void Configure(EntityTypeBuilder<Produto> builder)
        {
            builder.HasKey(p => p.Id);

            builder.Property(p => p.Codigo)
                   .HasColumnType("varchar(200)")
                   .IsRequired();

            builder.Property(p => p.Descricao)
                   .HasColumnType("varchar(1000)")
                   .IsRequired();

            builder.Property(p => p.Preco)
                   .HasColumnType("decimal(18,2)")
                   .IsRequired();

            builder.Property(p => p.Status)
                   .HasColumnType("boolean")
                   .IsRequired();

            builder.HasOne(p => p.Departamento)
                   .WithMany(p => p.Produtos)
                   .HasForeignKey(p => p.IdDepartamento)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.ToTable("Produtos");
        }
    }
}
