namespace LHFD.CatalogoDeProdutos.Business.Dtos.Response
{
    public class ProdutoResponseDto
    {
        public Guid Id { get; set; }
        public string Codigo { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public decimal Preco { get; set; }
        public bool Status { get; set; } = true;
        public int IdDepartamento { get; set; }
        public string? Departamento { get; set; } = string.Empty;
    }
}
