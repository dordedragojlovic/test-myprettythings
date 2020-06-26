import defaultDB from '../database';
import purchaseRepositoryFactory from './purchase';
import { Repositories } from '../types';

export default function repositoriesFactory(database: LokiConstructor = defaultDB): Repositories {
  return { purchase: purchaseRepositoryFactory(database) };
}
