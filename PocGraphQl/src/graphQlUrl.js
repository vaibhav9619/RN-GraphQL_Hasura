import { ApolloClient, InMemoryCache ,split,HttpLink} from '@apollo/client'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from '@apollo/client/utilities';
export const makeApolloClient = (token) => {
    const link = new HttpLink({
        uri: 'https://react-demo.hasura.app/v1/graphql',
        headers: {
            'x-hasura-admin-secret': token
        }
    })
    const linkin = new WebSocketLink({
        uri: `wss://react-demo.hasura.app/v1/graphql`,
        options: {
            reconnect: true,
            connectionParams: {
                headers: {
                    'x-hasura-admin-secret': token
                }
            }
        }
    })
    const splitLink = split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          );
        },
        linkin,
        link,
      );
        
    const cache = new InMemoryCache()

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
  });
    return client;
}
