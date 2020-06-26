import { ApolloServer } from 'apollo-server';
import schema from './schema';
import resolversFactory from './resolvers';

import repositoriesFactory from './repositories';
import database from './database';
import CONFIG from './config';

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolversFactory(repositoriesFactory(database)),
});

server.listen({ port: CONFIG.PORT }).then(({ url, subscriptionsUrl }: { url: string; subscriptionsUrl: string }) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});
