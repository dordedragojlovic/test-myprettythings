import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import CONFIG from './config';
import gql from 'graphql-tag';
import { Observable } from 'apollo-link';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { DocumentNode, execute, FetchResult } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import * as ws from 'ws';
import WebSocket from 'isomorphic-ws';

const client = new ApolloClient({
  link: createHttpLink({ uri: CONFIG.HTTPS_API_URL, fetch }),
  cache: new InMemoryCache(),
});
const wsClient = new SubscriptionClient(CONFIG.WS_API_URL, { reconnect: true }, WebSocket);

const createSubscriptionObservable = (query: DocumentNode, variables: Record<string, unknown> = {}) => {
  const link = new WebSocketLink(wsClient);
  return execute(link, { query: query, variables: variables });
};

async function createPurchase(
  items = [],
  { cardNumber, cvc, validity = '10/30', authType },
): Promise<{ id: string; confirmed: boolean }> {
  return (
    await client.mutate({
      mutation: gql`
      mutation($purchase: PurchaseInput!) {
        createPurchase(purchase: $purchase) {
          id
          paid
        }
      }
      `,
      variables: {
        purchase: { items, paymentInfo: { cardNumber, cvc, validity, bank: 'MyOkayCash', authType } },
      },
    })
  ).data.createPurchase;
}

function getPurchaseObservable(purchaseId: string): Observable<boolean> {
  const fetchResultObservable = createSubscriptionObservable(
    gql`
      subscription($id: ID!) {
        purchasePaid(id: $id)
      }
    `,
    { id: purchaseId },
  );
  return Observable.from(fetchResultObservable).map((value) => value.data.purchasePaid);
}

const API = {
  createPurchase,
  getPurchaseObservable,
};

export default API;
