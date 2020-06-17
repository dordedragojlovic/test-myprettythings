import cors from 'micro-cors';
import { send } from 'micro';
import { ApolloServer } from 'apollo-server-micro';

import resolversFactory from 'lib/graphql-server/resolvers';
import typeDefs from 'lib/graphql-server/types';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers: resolversFactory(),
  playground: true,
  introspection: true,
  uploads: false,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const apolloHandler = apolloServer.createHandler({ path: '/api/graphql' });

export default cors()((req, res) => {
  if (req.method === 'OPTIONS') {
    return send(res, 200);
  }

  return apolloHandler(req, res);
});
