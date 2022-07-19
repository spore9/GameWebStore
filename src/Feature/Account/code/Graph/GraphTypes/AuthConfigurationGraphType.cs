namespace GameWebStore.Feature.Account.Graph.GraphTypes
{
    using GameWebStore.Foundation.Security.JsModels;
    using GraphQL.Types;
    internal class AuthConfigurationGraphType : ObjectGraphType<AuthConfigurationModel>
    {
        public AuthConfigurationGraphType()
        {
            this.Name = "Account_AuthConfiguration";
            this.Field<StringGraphType>("authority", resolve: _ => _.Source.Authority);
            this.Field<StringGraphType>("clientId", resolve: _ => _.Source.ClientId);
            this.Field<StringGraphType>("redirectUri", resolve: _ => _.Source.RedirectUri);
            this.Field<StringGraphType>("postLogoutRedirectUri", resolve: _ => _.Source.PostLogoutRedirectUri);
            this.Field<StringGraphType>("responseType", resolve: _ => _.Source.ResponseType);
            this.Field<StringGraphType>("scope", resolve: _ => _.Source.Scope);
        }
    }
}
