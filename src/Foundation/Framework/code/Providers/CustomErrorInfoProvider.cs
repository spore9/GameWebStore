namespace GameWebStore.Foundation.Framework.Providers
{
    using GraphQL;
    using GraphQL.Execution;

    public class CustomErrorInfoProvider : ErrorInfoProvider
    {
        public CustomErrorInfoProvider(): base(opt => opt.ExposeExceptionStackTrace = true)
        {
        }
        public override ErrorInfo GetInfo(ExecutionError executionError)
        {
            var errorInfo = base.GetInfo(executionError);
            var code = errorInfo.Extensions["code"];
            if (code != null && code.Equals("PERSISTED_QUERY_NOT_FOUND"))
            {
                errorInfo.Message = "PersistedQueryNotFound";
            }
            return errorInfo;
        }
    }
}
