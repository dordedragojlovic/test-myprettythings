import Loki from 'lokijs';
import COLLECTIONS from './collections';
import CONFIG from '../config';

export function getDatabase(databaseName: string = CONFIG.DATABASE_NAME): LokiConstructor {
  const database = new Loki(databaseName);

  COLLECTIONS.forEach((collection) => {
    database.addCollection(collection);
  });

  return database;
}

export default getDatabase();
