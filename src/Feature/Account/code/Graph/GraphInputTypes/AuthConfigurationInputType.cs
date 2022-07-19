namespace GameWebStore.Feature.Account.Graph.GraphInputTypes
{
    using GameWebStore.Foundation.Security.JsModels;
    using GraphQL.Types;

    internal class AuthConfigurationInputType: InputObjectGraphType<AuthConfigurationInputModel>
    {
        public AuthConfigurationInputType()
        {
            this.Name = "Account_AuthConfigurationInput";
            this.Field<StringGraphType>("clientId", resolve: _ => _.Source.ClientId);

        }
    }
}
