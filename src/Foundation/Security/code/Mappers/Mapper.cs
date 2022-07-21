namespace GameWebStore.Foundation.Security.Mappers
{
    using GameWebStore.Foundation.Security.JsModels;
    using System.Collections.Generic;

    internal class Mapper : IMapper
    {
        public AuthConfigurationModel Map(IDictionary<string, string> source)
        {
            //TODO: get all keys from names
            var destination = new AuthConfigurationModel();
            destination.Authority = getValueFromDictionary(source, nameof(destination.Authority).ToLower());
            destination.ClientId = getValueFromDictionary(source, "client_id");
            destination.RedirectUri = getValueFromDictionary(source, "redirect_uri");
            destination.PostLogoutRedirectUri = getValueFromDictionary(source, "post_logout_redirect_uri");
            destination.ResponseType = getValueFromDictionary(source, "response_type");
            destination.Scope = getValueFromDictionary(source, nameof(destination.Scope).ToLower());
            return destination;
        }
        private string getValueFromDictionary(IDictionary<string, string> source, string key)
        {
            string? value;
            source.TryGetValue(key, out value);
            return value;
        }
    }
}
