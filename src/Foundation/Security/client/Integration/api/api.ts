import { graphQL } from "Foundation/Integration/client/GraphQL";
import { AuthConfigurationInputModel } from "../../GeneratedModels/auth-configuration-input-model";
import { AuthConfigurationModel } from "../../GeneratedModels/auth-configuration-model";
import { REQUEST_AUTH_CONFIGURATION_QUERY } from "./graphql";
import { RequestAuthConfigurationVariables } from "./models";

export const requestAlipayRedirectData = (authParameters: AuthConfigurationInputModel) =>
  graphQL.query<AuthConfigurationModel, RequestAuthConfigurationVariables>({
    query: REQUEST_AUTH_CONFIGURATION_QUERY,
    variables: { authParameters },
    fetchPolicy: 'no-cache',
  });