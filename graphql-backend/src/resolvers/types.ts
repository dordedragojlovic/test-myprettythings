import {PaymentInfo, PurchaseInput, PurchaseStatus} from 'generated/graphql-types';
import {Observable} from "zen-observable-ts";
import {FetchResult} from "apollo-link";

export type Repositories = {
  purchase: PurchaseRepository;
};

export type PurchaseRepository = {
  get: (id: string) => PurchaseStatus;
  createPurchase: (purchase: PurchaseInput, paymentId: string, paid: boolean) => PurchaseStatus;
  updatePurchase: (id: string, fieldsToUpdate: { paid: boolean; confirmed: boolean }) => PurchaseStatus;
};

export type BankService = {
postPayment: (paymentInfo: PaymentInfo) => Promise<{id: string, confirmed: boolean}>
  getPaymentObservable: (paymentId: string, paymentInfo: PaymentInfo) => Observable<FetchResult>
}
