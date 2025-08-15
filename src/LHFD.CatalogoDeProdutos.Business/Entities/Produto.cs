namespace LHFD.CatalogoDeProdutos.Business.Entities
{
    public class Produto : Entity
    {
        public string Codigo { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public string Departamento { get; set; } = string.Empty;
        public decimal Preco { get; set; }
        public bool Status { get; set; } = true;
    }
}
