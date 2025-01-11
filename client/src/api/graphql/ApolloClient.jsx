import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://leetcode.com/graphql/', // Replace with your GraphQL API endpoint
  cache: new InMemoryCache()
});
export const ApolloProviderWrapper = ({ children }) => (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );