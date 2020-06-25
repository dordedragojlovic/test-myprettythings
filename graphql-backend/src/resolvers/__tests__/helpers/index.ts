import { ApolloServer } from 'apollo-server';
import typeDefs from '../../../types';
import resolversFactory from '../../../resolvers';
import repositoriesFactory from '../../../repositories';
import { createTestClient } from 'apollo-server-testing';
import { getDatabase } from '../../../database';
import streams from '../../../streams';
import bankServiceFactory from '../../../bank-service';

export const TEST_DATABASE = getDatabase('pretty_things_test.db');
const bankService = bankServiceFactory();
export const server = new ApolloServer({
  typeDefs,
  resolvers: resolversFactory(repositoriesFactory(TEST_DATABASE), streams, {
    postPayment: () => Promise.resolve({ id: '1', confirmed: false }),
    getPaymentObservable: bankService.getPaymentObservable,
  }),
});

export const { query, mutate } = createTestClient(server);
