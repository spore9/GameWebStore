namespace GameWebStore.Foundation.Security
{
    using GameWebStore.Foundation.Security.Mappers;
    using Microsoft.Extensions.DependencyInjection;

    public static class GameWebStoreSecurityExtensions
    {
        public static IServiceCollection AddProjectSecurityServices(this IServiceCollection services)
        {
            services.AddTransient<IMapper, Mapper>();

            return services;
        }
    }
}
