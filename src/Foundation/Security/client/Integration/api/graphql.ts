import { gql } from '@apollo/client';

export const REQUEST_AUTH_CONFIGURATION_QUERY = gql`
query AuthConfigurationQuery($authConfigurationInput: Account_AuthConfigurationInput!) {
    configuration(
      authParameters: $authConfigurationInput
    ) {
        authority
        clientId
        redirectUri
        postLogoutRedirectUri
        responseType
          scope
    }
  }
`;