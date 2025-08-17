namespace LHFD.CatalogoDeProdutos.Business.Events
{
    public interface IProdutoCriadoEvent
    {
        public Guid Id { get; set; }
        public string Descricao { get; set; }
        public decimal Preco { get; set; }
    }
}
