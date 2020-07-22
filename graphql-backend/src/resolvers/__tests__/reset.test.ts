import { beforeEach, describe, expect, it } from '@jest/globals';
import testClientFactory, { TEST_DATABASE } from './helpers';
import streams from '../../streams';
import repositoriesFactory from '../../repositories';
import bankServiceFactory from '../../bank-service';
import { PURCHASES } from '../../database/collections';
import { gql } from 'apollo-server-core';

const { mutate } = testClientFactory({
  repositories: repositoriesFactory(TEST_DATABASE),
  bankService: bankServiceFactory(),
  streams: streams,
});

describe('reset mutation', () => {
  const collection = TEST_DATABASE.getCollection(PURCHASES);

  beforeEach(() => {
    collection.clear();
  });

  it('should remove all purchases document in collection', async () => {
    collection.insert({});
    collection.insert({});
    collection.insert({});

    const res = await mutate({
      mutation: gql`
        mutation {
          reset
        }
      `,
    });

    expect(res.data.reset).toEqual(true);

    expect(collection.find()).toHaveLength(0);
  });
});
