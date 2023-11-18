import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

/**
 * Apollo cache
 * @type {Object}
 */
const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_HOST,
});

const errorLink = onError(({ response, graphQLErrors, networkError }) => {
  if (response) {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ));
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
    response.errors = null;
  }
});

const createApolloClient = () => {
  return new ApolloClient({ cache, link: from([errorLink, httpLink]) });
};

export default createApolloClient;