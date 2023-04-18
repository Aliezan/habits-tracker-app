import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const wsLink = new GraphQLWsLink(
    createClient({
        url: 'wss://talented-ringtail-13.hasura.app/v1/graphql',
        connectionParams: {
            headers: {
                "x-hasura-admin-secret":
                    "w08UDwL7554HXD0lvqOubSXuiDt7ydDYeEkYNy59Cs49DacAfCgOOU75pqUUB9oq"
            },
        },

    })
);

const httpLink = new HttpLink({
    uri: 'https://talented-ringtail-13.hasura.app/v1/graphql',
    headers: {
        "x-hasura-admin-secret":
            "w08UDwL7554HXD0lvqOubSXuiDt7ydDYeEkYNy59Cs49DacAfCgOOU75pqUUB9oq"

    }
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
    httpLink
);

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
});

export default client;


