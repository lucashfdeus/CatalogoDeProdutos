using LHFD.CatalogoDeProdutos.Business.Events;
using LHFD.CatalogoDeProdutos.Business.Interfaces.Events;
using MassTransit;

namespace LHFD.CatalogoDeProdutos.Data.Messaging
{
    public class ProdutoEventPublisher(IPublishEndpoint publishEndpoint) : IProdutoEventPublisher
    {
        private readonly IPublishEndpoint _publishEndpoint = publishEndpoint;

        public async Task Publicar(IProdutoCriadoEvent evento) => await _publishEndpoint.Publish(evento);
    }
}
