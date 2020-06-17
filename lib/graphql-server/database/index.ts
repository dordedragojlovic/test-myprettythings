import Loki from 'lokijs';
import COLLECTIONS from './collections';

export function getDatabase(databaseName: string = 'pretty_things.db'): LokiConstructor {
  const database = new Loki(databaseName);

  COLLECTIONS.forEach((collection) => {
    database.addCollection(collection);
  });

  return database;
}

export default getDatabase();
