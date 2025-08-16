using FluentValidation;
using FluentValidation.Results;
using LHFD.CatalogoDeProdutos.Business.Entities;
using LHFD.CatalogoDeProdutos.Business.Interfaces;
using LHFD.CatalogoDeProdutos.Business.Notification;

namespace LHFD.CatalogoDeProdutos.Business.Services
{
    public abstract class BaseService
    {
        private readonly INotification _notification;
        private readonly IUnitOfWork _uow;

        protected BaseService(INotification notification, IUnitOfWork uow)
        {
            _notification = notification;
            _uow = uow;
        }

        protected void Notify(ValidationResult validationResult)
        {
            foreach (var item in validationResult.Errors)
            {
                Notify(item.ErrorMessage);
            }
        }

        protected void Notify(string message)
        {
            _notification.Handle(new AppNotification(message));
        }

        protected bool ExecuteValidation<TV, TE>(TV validation, TE entity)
            where TV : AbstractValidator<TE>
            where TE : Entity
        {
            var validator = validation.Validate(entity);

            if (validator.IsValid) return true;

            Notify(validator);

            return false;
        }

        protected async Task<bool> Commit()
        {
            if (await _uow.Commit()) return true;

            Notify("Não foi possível salvar os dados no banco!");
            return false;
        }
    }
}
