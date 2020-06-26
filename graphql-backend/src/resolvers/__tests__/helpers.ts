import { ApolloServer } from 'apollo-server';
import schema from 'schema';
import resolversFactory from '../../resolvers';
import repositoriesFactory from '../../repositories';
import { createTestClient } from 'apollo-server-testing';
import { getDatabase } from '../../database';
import streams from '../../streams';
import bankServiceFactory from '../../bank-service';
import CONFIG from '../../config';

export const TEST_DATABASE = getDatabase(CONFIG.TEST_DATABASE_NAME);
const bankService = bankServiceFactory();
export const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolversFactory(repositoriesFactory(TEST_DATABASE), streams, {
    postPayment: () => Promise.resolve({ id: '1', confirmed: false }),
    getPaymentObservable: bankService.getPaymentObservable,
  }),
});

export const { query, mutate } = createTestClient(server);
