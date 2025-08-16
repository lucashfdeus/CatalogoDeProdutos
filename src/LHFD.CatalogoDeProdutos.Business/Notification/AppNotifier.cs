using LHFD.CatalogoDeProdutos.Business.Interfaces;

namespace LHFD.CatalogoDeProdutos.Business.Notification
{
    public class AppNotifier : INotification
    {
        private List<AppNotification> _notifications;

        public AppNotifier() => _notifications = [];        

        public void Handle(AppNotification notification)
            => _notifications.Add(notification);       

        public List<AppNotification> GetNotifications() => _notifications;

        public bool HasNotification() => _notifications.Count != 0;
    }
}
