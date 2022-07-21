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
            this.Field<StringGraphType>("client_id", resolve: _ => _.Source.ClientId);
            this.Field<StringGraphType>("redirect_uri", resolve: _ => _.Source.RedirectUri);
            this.Field<StringGraphType>("post_logout_redirect_uri", resolve: _ => _.Source.PostLogoutRedirectUri);
            this.Field<StringGraphType>("response_type", resolve: _ => _.Source.ResponseType);
            this.Field<StringGraphType>("scope", resolve: _ => _.Source.Scope);
        }
    }
}
