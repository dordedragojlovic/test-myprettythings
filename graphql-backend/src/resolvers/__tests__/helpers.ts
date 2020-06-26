import { ApolloServer } from 'apollo-server';
import schema from 'schema';
import resolversFactory from '../../resolvers';
import repositoriesFactory from '../../repositories';
import { ApolloServerTestClient, createTestClient } from 'apollo-server-testing';
import { getDatabase } from '../../database';
import STREAMS from '../../streams';
import CONFIG from '../../config';
import { Observable } from 'zen-observable-ts';
import { BankService, Repositories, Streams } from '../../types';

export const TEST_DATABASE = getDatabase(CONFIG.TEST_DATABASE_NAME);

export default function testClientFactory({
  repositories = repositoriesFactory(TEST_DATABASE),
  bankService = {
    postPayment: () => Promise.resolve({ id: '1', confirmed: true }),
    getPaymentObservable: () => Observable.of(true),
  },
  streams = STREAMS,
}: {
  repositories?: Repositories;
  bankService?: BankService;
  streams?: Streams;
} = {}): ApolloServerTestClient {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers: resolversFactory(repositories, streams, bankService),
  });
  return createTestClient(server);
}
