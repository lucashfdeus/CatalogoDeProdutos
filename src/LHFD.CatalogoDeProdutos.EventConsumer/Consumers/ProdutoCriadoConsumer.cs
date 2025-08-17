using LHFD.CatalogoDeProdutos.Business.Events;
using MassTransit;

namespace LHFD.CatalogoDeProdutos.EventConsumer.Consumers
{
    public class ProdutoCriadoConsumer : IConsumer<IProdutoCriadoEvent>
    {
        public Task Consume(ConsumeContext<IProdutoCriadoEvent> context)
        {
            var evento = context.Message;

            Console.WriteLine($"[Evento recebido] Produto criado: {evento.Id} - {evento.Descricao} - R$ {evento.Preco}");

            // Ex: salvar em log, enviar e-mail, etc.

            return Task.CompletedTask;
        }
    }
}
