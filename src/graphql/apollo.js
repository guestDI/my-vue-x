import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";
import { createApolloProvider } from "@vue/apollo-option";
import { onError } from "@apollo/client/link/error";

const cache = new InMemoryCache();
const uri = new HttpLink({ uri: "http://localhost:4000/graphql" });

// Error Handling
export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const apolloClient = new ApolloClient({
  link: errorLink.concat(uri),
  cache,
});

export const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});
