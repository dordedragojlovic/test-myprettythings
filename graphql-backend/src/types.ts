import { PaymentInfo, PurchaseInput, PurchaseStatus } from './generated/graphql-types';
import { Observable } from 'zen-observable-ts';
import { ResolverFn } from 'graphql-subscriptions';

export type Config = {
  PORT: string;
  MY_OKAY_CASH_WS_API_URL: string;
  MY_OKAY_CASH_HTTPS_API_URL: string;
  DATABASE_NAME: string;
  TEST_DATABASE_NAME: string;
};

export type Repositories = {
  purchase: PurchaseRepository;
};

export type PurchaseRepository = {
  get: (id: string) => PurchaseStatus;
  createPurchase: (purchase: PurchaseInput, paymentId: string, paid: boolean) => PurchaseStatus;
  updatePurchase: (id: string, fieldsToUpdate: { paid: boolean; confirmed: boolean }) => PurchaseStatus;
};

export type BankService = {
  postPayment: (
    paymentInfo: PaymentInfo,
    amount: number,
    currency: string,
  ) => Promise<{ id: string; confirmed: boolean }>;
  getPaymentObservable: (paymentId: string, paymentInfo: PaymentInfo) => Observable<boolean>;
};

export type PurchasePaidStream = {
  name: string;
  publish: (input: { paid: boolean; id: string }) => void;
  resolver: {
    resolve: (payload: { purchasePaid: { id: string; paid: boolean } }) => boolean;
    subscribe: ResolverFn;
  };
};

export type Streams = {
  purchasePaid: PurchasePaidStream;
};
