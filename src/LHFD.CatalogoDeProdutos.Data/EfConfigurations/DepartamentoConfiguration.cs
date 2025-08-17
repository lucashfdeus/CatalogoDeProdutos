using LHFD.CatalogoDeProdutos.Business.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LHFD.CatalogoDeProdutos.Data.EfConfigurations
{
    public class DepartamentoConfiguration : IEntityTypeConfiguration<Departamento>
    {
        public void Configure(EntityTypeBuilder<Departamento> builder)
        {
            builder.HasKey(d => d.Id);

            builder.Property(d => d.Nome)
                   .HasColumnType("varchar(255)")
                   .IsRequired();

            builder.ToTable("Departamentos");
        }
    }
}
