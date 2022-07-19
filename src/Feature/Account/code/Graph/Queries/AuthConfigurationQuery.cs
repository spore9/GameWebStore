namespace GameWebStore.Feature.Account.Graph.Queries
{
    using GameWebStore.Feature.Account.Graph.GraphInputTypes;
    using GameWebStore.Feature.Account.Graph.GraphTypes;
    using GameWebStore.Foundation.Security.JsModels;
    using GraphQL;
    using GraphQL.Types;
    using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
    using Microsoft.AspNetCore.Http;

    internal class AuthConfigurationQuery : ObjectGraphType
    {
        public AuthConfigurationQuery(IClientRequestParametersProvider clientRequestParametersProvider, IHttpContextAccessor httpContextAccessor)
        {

            Field<AuthConfigurationGraphType>("configuration", arguments: new QueryArguments(
                new QueryArgument<NonNullGraphType<AuthConfigurationInputType>> { Name = "authParameters" }
            ), resolve: context =>
            {
                var authParameters = context.GetArgument<AuthConfigurationInputModel>("authParameters");
                var parameters = clientRequestParametersProvider.GetClientParameters(httpContextAccessor.HttpContext, authParameters.ClientId);
 
                return parameters;
            });
        }
    }
}
