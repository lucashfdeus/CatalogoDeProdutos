using LHFD.CatalogoDeProdutos.Business.Interfaces;
using System.Security.Claims;

namespace LHFD.CatalogoDeProdutos.Api.Extensions
{
    public class AppUser(IHttpContextAccessor accessor) : IUser
    {
        private readonly ClaimsPrincipal _user = accessor.HttpContext?.User ?? new ClaimsPrincipal();

        public string Name => _user.Identity?.Name ?? string.Empty;
        public string Id => _user.FindFirstValue(ClaimTypes.NameIdentifier) ?? string.Empty;
        public string Email => _user.FindFirstValue(ClaimTypes.Email) ?? string.Empty;

        public Guid GetUserId() => Guid.TryParse(Id, out var guid) ? guid : Guid.Empty;
        
        public string GetUserEmail() => Email;

        public bool IsAuthenticated() => _user.Identity?.IsAuthenticated ?? false;        
    }
}
