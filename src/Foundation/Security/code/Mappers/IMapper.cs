namespace GameWebStore.Foundation.Security.Mappers
{
    using GameWebStore.Foundation.Security.JsModels;

    public interface IMapper
    {
        AuthConfigurationModel Map(IDictionary<string, string> source);
    }
}
