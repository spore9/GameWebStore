import { gql } from '@apollo/client';

export const REQUEST_AUTH_CONFIGURATION_QUERY = gql`
query AuthConfigurationQuery($authParameters: Account_AuthConfigurationInput!) {
    configuration(
      authParameters: $authParameters
    ) {
        authority
        client_id
        redirect_uri
        post_logout_redirect_uri
        response_type
        scope
    }
  }
`;