import { ApolloServer } from 'apollo-server-micro';
import typeDefs from 'lib/graphql-server/types';
import resolversFactory from 'lib/graphql-server/resolvers';
import repositoriesFactory from 'lib/graphql-server/repositories';
import { createTestClient } from 'apollo-server-testing';
import { getDatabase } from 'lib/graphql-server/database';

export const TEST_DATABASE = getDatabase('pretty_things_test.db');
export const server = new ApolloServer({
  typeDefs,
  resolvers: resolversFactory(repositoriesFactory(TEST_DATABASE)),
});

export const { query, mutate } = createTestClient(server);
