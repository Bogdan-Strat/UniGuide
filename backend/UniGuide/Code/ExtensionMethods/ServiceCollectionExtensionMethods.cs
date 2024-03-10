using BusinessLogic.Base;
using BusinessLogic.Implementation.UserAccount;
using Common.DTOs;
using System.Security.Claims;
using UniGuide.Code.Base;

namespace UniGuide.Code.ExtensionMethods
{
    public static class ServiceCollectionExtensionMethods
    {
        public static IServiceCollection AddPresentation(this IServiceCollection services)
        {
            services.AddScoped<ControllerDependencies>();

            return services;
        }

        public static IServiceCollection AddUniGuideBusinessLogic(this IServiceCollection services)
        {
            services.AddScoped<ServiceDependencies>();
            services.AddScoped<BaseService>();
            services.AddScoped<UserService>();

            return services;
        }

        public static IServiceCollection AddUniGuideCurrentUser(this IServiceCollection services)
        {
            services.AddScoped(s =>
            {
                var accessor = s.GetService<IHttpContextAccessor>();
                var httpContext = accessor.HttpContext;
                var claims = httpContext.User.Claims;

                var userIdClaim = claims?.FirstOrDefault(c => c.Type == "Id")?.Value;
                var isParsingSuccessful = Guid.TryParse(userIdClaim, out Guid id);

                return new CurrentUserDTO
                {
                    Id = id,
                    IsAuthenticated = httpContext.User.Identity.IsAuthenticated,
                    Email = claims?.FirstOrDefault(c => c.Type == "Email")?.Value,
                    Role = claims?.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value,
                    //PhotoId = claims?.FirstOrDefault(c => c.Type == "PhotoId")?.Value,
                    //PhotoPath = claims.FirstOrDefault(c => c.Type == "PhotoPath")?.Value

                };
            });

            return services;
        }
    }
}
