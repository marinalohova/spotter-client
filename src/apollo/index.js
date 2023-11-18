import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import { onError } from '@apollo/client/link/error';

/**
 * Apollo cache
 * @type {Object}
 */
const cache = new InMemoryCache();

/**
 * Apollo auth link
 * @type {Object}
 */
const authLink = setContext((_, { headers }) => {
  // const user = useContext(UserContext);
  // return {
  //   headers: {
  //     ...headers,
  //     authorization: user ? `Bearer ${user.getIdToken()}` : '',
  //   },
  // };
  return headers;
});


// const link = authLink.split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === 'OperationDefinition'
//       && definition.operation === 'subscription'
//     );
//   },
//   // wsLink,
//   uploadLink,
// );

const httpLink = new HttpLink({
  uri: 'https://spotter-pypt6oml4-my-team-113b7bd1.vercel.app/graphql',
  headers: {
    'x-api-key': process.env.NEXT_PUBLIC_X_API_KEY,
    'Accept-Encoding': 'gzip',
  },
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
    // toast.notify(graphQLErrors[0].INTERNAL_SERVER_ERROR, {
    //   duration: 5,
    //   title: "We've encountered a problem",
    //   type: 'error',
    // });
  }
});

const client = new ApolloClient({ cache, link: from([errorLink, httpLink]) });

export default client;
