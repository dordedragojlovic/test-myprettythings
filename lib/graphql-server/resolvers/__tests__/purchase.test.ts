import { PURCHASES } from 'lib/graphql-server/database/collections';
import { beforeEach, describe, expect, it } from '@jest/globals';
import { mutate, query, TEST_DATABASE } from './helpers';
import { gql } from 'apollo-server-core';

describe('purchase resolvers', () => {
  const collection = TEST_DATABASE.getCollection(PURCHASES);
  beforeEach(() => {
    collection.clear();
  });

  describe('createPurchase', () => {
    it('should insert purchase to database and return it with id', async () => {
      const PURCHASE = {
        items: [{ id: '1', amount: 10, price: 300.5 }],
      };
      const res = await mutate({
        mutation: gql`
          mutation CREATE_PURCHASE($purchase: PurchaseInput) {
            createPurchase(purchase: $purchase) {
              id
              confirmed
              items {
                amount
                id
                price
              }
              paid
            }
          }
        `,
        variables: {
          purchase: { ...PURCHASE, paymentInfo: { bank: 'MyOkayCash', cardNumber: '', cvc: '', validity: '' } },
        },
      });
      const PURCHASE_OUTPUT = { ...PURCHASE, paid: false, confirmed: false };
      expect(res).toMatchObject({ data: { createPurchase: PURCHASE_OUTPUT } });
      expect(Object.keys(res.data.createPurchase)).toContain('id');

      const purchases = collection.find();
      expect(purchases.length).toEqual(1);
      expect(purchases[0]).toMatchObject(PURCHASE_OUTPUT);
    });
  });

  describe('purchase', () => {
    it('should get particular purchase with all correct data', async () => {
      collection.insert({ items: [], paid: true, confirmed: false });
      const res = await query({
        query: gql`
          query GET_PURCHASE($id: ID!) {
            purchase(id: $id) {
              confirmed
              id
              paid
              items {
                id
              }
            }
          }
        `,
        variables: { id: '1' },
      });
      expect(res).toMatchObject({ data: { purchase: { items: [], paid: true, confirmed: false, id: '1' } } });
    });
  });
});
