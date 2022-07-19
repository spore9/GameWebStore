import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { GraphQLFactory as gqlFactory } from './GraphQLFactory';

export let graphQL: ApolloClient<NormalizedCacheObject> = undefined;

export function GraphQLFactory(ssr: boolean) {
  if (!graphQL) {
    graphQL = gqlFactory(ssr);
  }
  return graphQL;
}