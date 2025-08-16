using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LHFD.CatalogoDeProdutos.Data.Migrations
{
    /// <inheritdoc />
    public partial class _202508140014_InicialAjuste : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Produtos_Departamentos_DepartamentoId",
                table: "Produtos");

            migrationBuilder.AlterColumn<string>(
                name: "Nome",
                table: "Departamentos",
                type: "varchar(255)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(100)");

            migrationBuilder.AddForeignKey(
                name: "FK_Produtos_Departamentos_DepartamentoId",
                table: "Produtos",
                column: "DepartamentoId",
                principalTable: "Departamentos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Produtos_Departamentos_DepartamentoId",
                table: "Produtos");

            migrationBuilder.AlterColumn<string>(
                name: "Nome",
                table: "Departamentos",
                type: "varchar(100)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(255)");

            migrationBuilder.AddForeignKey(
                name: "FK_Produtos_Departamentos_DepartamentoId",
                table: "Produtos",
                column: "DepartamentoId",
                principalTable: "Departamentos",
                principalColumn: "Id");
        }
    }
}
