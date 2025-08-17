using FluentValidation;
using LHFD.CatalogoDeProdutos.Business.Interfaces;
using LHFD.CatalogoDeProdutos.Business.Notification;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace LHFD.CatalogoDeProdutos.Api.Controllers
{
    [ApiController]
    public abstract class MainController : ControllerBase
    {
        private readonly INotification _notification;

        protected MainController(INotification notification)
        {
            _notification = notification;        
        }

        protected bool ValidOperation()
        {
            return !_notification.HasNotification();
        }

        protected List<string?> GetNotifications()
        {
            return [.. _notification.GetNotifications().Select(n => n.Message)];
        }

        protected ActionResult CustomResponse(object result)
        {
            if (ValidOperation())
            {
                return Ok(new
                {
                    success = true,
                    data = result
                });
            }

            return BadRequest(new
            {
                success = false,
                errors = _notification.GetNotifications().Select(n => n.Message)
            });
        }

        protected async Task<ActionResult> CustomValidate<T>(T model, IValidator<T> validator)
        {
            var validationResult = await validator.ValidateAsync(model);

            if (!validationResult.IsValid)
            {
                foreach (var error in validationResult.Errors)
                {
                    NotifyError(error.ErrorMessage);
                }
            }

            return CustomResponse(model);
        }

        protected void NotifyError(string mensagem)
        {
            _notification.Handle(new AppNotification(mensagem));
        }
    }
}
