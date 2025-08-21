using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LHFD.CatalogoDeProdutos.Data.Migrations
{
    /// <inheritdoc />
    public partial class _202508202059_ProdutoEDepartamento : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Produtos",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Produtos");
        }
    }
}
