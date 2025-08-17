using LHFD.CatalogoDeProdutos.Business.Events;

namespace LHFD.CatalogoDeProdutos.Business.Interfaces.Events
{
    public interface IProdutoEventPublisher
    {
        Task Publicar(IProdutoCriadoEvent evento);
    }
}
