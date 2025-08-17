using System.ComponentModel.DataAnnotations;

namespace LHFD.CatalogoDeProdutos.Business.Entities
{
    public class Departamento
    {
        [Key]
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;

        public ICollection<Produto> Produtos { get; set; } = [];
    }
}
