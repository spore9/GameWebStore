import { ApolloClient, InMemoryCache } from '@apollo/client';
import { sha256 } from 'crypto-hash';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';

export function GraphQLFactory(ssr: boolean) {
  const link = createPersistedQueryLink({ sha256 }).concat(
    new BatchHttpLink({
      uri: 'https://localhost:44436/graphql',
      credentials: 'include',
      headers: {
        connection: 'keep-alive',
      },
    }),
  );

  return new ApolloClient({
    ssrMode: ssr,
    ssrForceFetchDelay: 100,
    link,
    cache: new InMemoryCache(),
  });
}