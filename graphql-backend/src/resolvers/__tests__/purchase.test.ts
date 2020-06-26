import { PURCHASES } from '../../database/collections';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import testClientFactory, { TEST_DATABASE } from './helpers';
import { gql } from 'apollo-server-core';
import { Observable } from 'zen-observable-ts';
import streams from '../../streams';
import purchaseRepositoryFactory from '../../repositories/purchase';

const getPaymentObservableMock = jest.fn(() => Observable.of(true));
const publishMock = jest.fn();
const postPaymentMock = jest.fn(() => Promise.resolve({ id: '1', confirmed: false }));
const purchaseRepository = purchaseRepositoryFactory(TEST_DATABASE);

const updatePurchaseMock = jest.fn(purchaseRepository.updatePurchase);
const createPurchaseMock = jest.fn(purchaseRepository.createPurchase);
const { mutate, query } = testClientFactory({
  repositories: {
    purchase: {
      updatePurchase: updatePurchaseMock,
      createPurchase: createPurchaseMock,
      get: purchaseRepository.get,
    },
  },
  bankService: {
    postPayment: postPaymentMock,
    getPaymentObservable: getPaymentObservableMock,
  },
  streams: {
    purchasePaid: {
      name: streams.purchasePaid.name,
      publish: publishMock,
      resolver: streams.purchasePaid.resolver,
    },
  },
});
const collection = TEST_DATABASE.getCollection(PURCHASES);

describe('purchase resolvers', () => {
  beforeEach(() => {
    [
      publishMock,
      getPaymentObservableMock,
      postPaymentMock,
      createPurchaseMock,
      updatePurchaseMock,
    ].forEach((mockFunction) => mockFunction.mockClear());

    collection.clear();
  });

  describe('createPurchase', () => {
    const createPurchaseMutation = gql`
      mutation CREATE_PURCHASE($purchase: PurchaseInput!) {
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
    `;

    const PURCHASE = {
      items: [{ id: '1', amount: 10, price: 300.5 }],
    };
    const createPurchaseVariables = {
      purchase: { ...PURCHASE, paymentInfo: { bank: 'MyOkayCash', cardNumber: '', cvc: '', validity: '' } },
    };

    it('should insert purchase to database and return it with id', async () => {
      postPaymentMock.mockImplementation(() => Promise.resolve({ id: '1', confirmed: false }));

      const res = await mutate({
        mutation: createPurchaseMutation,
        variables: createPurchaseVariables,
      });
      expect(res).toMatchObject({ data: { createPurchase: { ...PURCHASE, paid: false, confirmed: false } } });
      expect(Object.keys(res.data.createPurchase)).toContain('id');

      expect(getPaymentObservableMock).toBeCalled();
      expect(createPurchaseMock).toBeCalled();
      expect(updatePurchaseMock).toBeCalled();
      expect(publishMock).toBeCalledWith({ id: res.data.createPurchase.id, paid: true });

      const purchases = collection.find();
      expect(purchases.length).toEqual(1);
      expect(purchases[0]).toMatchObject({ ...PURCHASE, paid: true, confirmed: false });
    });

    it('should not create observable when payment is directly confirmed', async () => {
      postPaymentMock.mockImplementation(() => Promise.resolve({ id: '1', confirmed: true }));

      const res = await mutate({
        mutation: createPurchaseMutation,
        variables: createPurchaseVariables,
      });

      expect(res).toMatchObject({ data: { createPurchase: { ...PURCHASE, paid: true, confirmed: false } } });
      expect(Object.keys(res.data.createPurchase)).toContain('id');

      expect(getPaymentObservableMock).not.toBeCalled();
      expect(updatePurchaseMock).not.toBeCalled();
      expect(publishMock).toBeCalledWith({ id: res.data.createPurchase.id, paid: true });

      const purchases = collection.find();
      expect(purchases[0]).toMatchObject({ ...PURCHASE, paid: true, confirmed: false });
    });

    it('should pass negative confirmation result from observable', async () => {
      postPaymentMock.mockImplementation(() => Promise.resolve({ id: '1', confirmed: false }));
      getPaymentObservableMock.mockImplementation(() => Observable.of(false));

      const res = await mutate({
        mutation: createPurchaseMutation,
        variables: createPurchaseVariables,
      });
      expect(res).toMatchObject({ data: { createPurchase: { ...PURCHASE, paid: false, confirmed: false } } });

      expect(getPaymentObservableMock).toBeCalled();
      expect(updatePurchaseMock).toBeCalled();
      expect(publishMock).toBeCalledWith({ id: res.data.createPurchase.id, paid: false });

      const purchases = collection.find();
      expect(purchases[0]).toMatchObject({ ...PURCHASE, paid: false, confirmed: false });
    });

    it('should pass more confirmation results from observable', async () => {
      postPaymentMock.mockImplementation(() => Promise.resolve({ id: '1', confirmed: false }));
      getPaymentObservableMock.mockImplementation(() => Observable.of(false, true));

      const res = await mutate({
        mutation: createPurchaseMutation,
        variables: createPurchaseVariables,
      });
      expect(res).toMatchObject({ data: { createPurchase: { ...PURCHASE, paid: false, confirmed: false } } });

      expect(publishMock).toBeCalledTimes(2);
      expect(updatePurchaseMock).toBeCalledTimes(2);

      expect(publishMock).toBeCalledWith({ id: res.data.createPurchase.id, paid: false });
      expect(publishMock).toBeCalledWith({ id: res.data.createPurchase.id, paid: true });

      const purchases = collection.find();
      expect(purchases[0]).toMatchObject({ ...PURCHASE, paid: true, confirmed: false });
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
