namespace GameWebStore.Foundation.Security.JsModels
{
    using TypeGen.Core.TypeAnnotations;

    [ExportTsInterface]
    public class AuthConfigurationModel
    {
        public string Authority { get; set; }
        public string ClientId { get; set; }
        public string RedirectUri { get; set; }
        public string PostLogoutRedirectUri { get; set; }
        public string ResponseType { get; set; }
        public string Scope { get; set; }

    }
}
