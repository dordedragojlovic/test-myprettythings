import defaultDB from '../database';
import purchaseRepositoryFactory from './purchase';
import { Repositories } from '../resolvers';

export default function repositoriesFactory(database: LokiConstructor = defaultDB): Repositories {
  return { purchase: purchaseRepositoryFactory(database) };
}
