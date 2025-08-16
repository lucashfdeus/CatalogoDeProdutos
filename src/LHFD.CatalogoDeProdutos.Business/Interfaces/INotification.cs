using LHFD.CatalogoDeProdutos.Business.Notification;

namespace LHFD.CatalogoDeProdutos.Business.Interfaces
{
    public interface INotification
    {
        bool HasNotification();
        List<AppNotification> GetNotifications();
        void Handle(AppNotification notification);
    }
}
