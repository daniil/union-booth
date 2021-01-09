import ApolloClient from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import WebSocket from 'isomorphic-ws';
import fetch from 'isomorphic-unfetch';

export default session => {
  const { SERVER_URL, PORT } = session;

  const httpLink = new HttpLink({
    uri: `http://${SERVER_URL}:${PORT}/graphql`
  });

  const wsLink = new WebSocketLink({
    uri: `ws://${SERVER_URL}:${PORT}/graphql`,
    options: {
      reconnect: true
    },
    webSocketImpl: WebSocket
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  const apolloClient = new ApolloClient({
    name: 'Union Booth',
    link: splitLink,
    cache: new InMemoryCache(),
    fetch,
  });

  return apolloClient;
}
