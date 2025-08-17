namespace LHFD.CatalogoDeProdutos.Business.Entities
{
    public class Produto : Entity
    {
        public string Codigo { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public int IdDepartamento { get; set; }
        public decimal Preco { get; set; }
        public bool Status { get; set; } = true;

        public Departamento? Departamento { get; set; }
    }
}
