namespace LHFD.CatalogoDeProdutos.Business.Dtos
{
    public class ProdutoRequestDto
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Codigo { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public decimal Preco { get; set; }
        public int IdDepartamento { get; set; }
    }
}