namespace GameWebStore.Feature.Account.Graph.Schemas
{
    using GameWebStore.Feature.Account.Graph.Queries;
    using GraphQL.Instrumentation;
    using GraphQL.Types;
    using System;

    public class AuthConfigurationSchema : Schema
    {
        public AuthConfigurationSchema(IServiceProvider provider)
    : base(provider)
        {
            Query = (AuthConfigurationQuery)provider.GetService(typeof(AuthConfigurationQuery)) ?? throw new InvalidOperationException();

            FieldMiddleware.Use(new InstrumentFieldsMiddleware());
        }
    }
}
