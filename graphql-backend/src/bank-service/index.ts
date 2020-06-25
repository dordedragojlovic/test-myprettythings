import { SubscriptionClient } from 'subscriptions-transport-ws';
import { DocumentNode, execute, FetchResult } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import ws from 'ws';
import { gql } from 'apollo-server-core';
import { Banks, PaymentInfo } from '../generated/graphql-types';
import { createHttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import CONFIG from '../config';
import { Observable } from 'zen-observable-ts';
import fetch from 'isomorphic-fetch';
import { BankService } from '../resolvers/types';

function paymentObservableFactory(
  createSubscriptionObservable: (
    wsurl: string,
    query: DocumentNode,
    variables: Record<string, unknown>,
  ) => Observable<FetchResult>,
  config = CONFIG,
): (paymentId: string, paymentInfo: PaymentInfo) => Observable<FetchResult> {
  return (paymentId: string, paymentInfo: PaymentInfo) => {
    if (paymentInfo.bank !== Banks.MyOkayCash) {
      throw new Error('Unsupported bank!');
    }

    return createSubscriptionObservable(
      config.MY_OKAY_CASH_WS_API_URL,
      gql`
        subscription($id: ID!) {
          paymentConfirmSuccessful(id: $id)
        }
      `,
      { id: paymentId },
    );
  };
}

function postPaymentFactory(
  client: ApolloClient<NormalizedCacheObject>,
): (paymentInfo: PaymentInfo) => Promise<{ id: string; confirmed: boolean }> {
  return async (paymentInfo: PaymentInfo) => {
    if (paymentInfo.bank !== Banks.MyOkayCash) {
      return Promise.reject('Unsupported bank');
    }

    return (
      await client.mutate({
        variables: {
          input: {
            amount: 300,
            currency: 'NOK',
            cardNumber: paymentInfo.cardNumber,
            validity: paymentInfo.validity,
            cvc: paymentInfo.cvc,
          },
        },
        mutation: gql`
          mutation CREATE_PAYMENT($input: PaymentInput!) {
            createPayment(input: $input) {
              id
              confirmed
            }
          }
        `,
      })
    ).data.createPayment;
  };
}

function bankServiceFactory(config = CONFIG): BankService {
  const client = new ApolloClient({
    link: createHttpLink({ uri: config.MY_OKAY_CASH_HTTPS_API_URL, fetch }),
    cache: new InMemoryCache(),
  });

  const getWsClient = function (wsurl: string) {
    return new SubscriptionClient(wsurl, { reconnect: true }, ws);
  };

  const createSubscriptionObservable = (
    wsurl: string,
    query: DocumentNode,
    variables: Record<string, unknown> = {},
  ) => {
    const link = new WebSocketLink(getWsClient(wsurl));
    return execute(link, { query: query, variables: variables });
  };

  return {
    postPayment: postPaymentFactory(client),
    getPaymentObservable: paymentObservableFactory(createSubscriptionObservable, config),
  };
}

export default bankServiceFactory;
