namespace GameWebStore.Foundation.Security.Services
{
    using GameWebStore.Foundation.Security.JsModels;
    using GameWebStore.Foundation.Security.Models;
    public interface IUserService
    {
        User GetUser();
        void RegisterUser(UserDto user);
    }
}
