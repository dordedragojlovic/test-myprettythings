import database from '../database';
import repositoriesFactory from '../repositories';
import { Resolvers } from '../generated/graphql-types';
import bankServiceFactory from '../bank-service';
import { makePromise } from 'apollo-link';
import { BankService, Repositories } from './types';
import STREAMS from '../streams';
import CONFIG from '../config';

export default (
  repositories: Repositories = repositoriesFactory(database),
  streams = STREAMS,
  bankService: BankService = bankServiceFactory(CONFIG),
): Resolvers => ({
  Query: {
    purchase: (_, variables) => repositories.purchase.get(variables.id),
  },
  Mutation: {
    createPurchase: async (_, variables) => {
      const paymentStatus = await bankService.postPayment(variables.purchase.paymentInfo);
      const purchase = repositories.purchase.createPurchase(
        variables.purchase,
        paymentStatus.id,
        paymentStatus.confirmed,
      );

      if (paymentStatus.confirmed) {
        streams.purchasePaid.publish({ paid: true, id: purchase.id });
        return purchase;
      }

      const purchasePaidObservable = bankService.getPaymentObservable(paymentStatus.id, variables.purchase.paymentInfo);
      makePromise(purchasePaidObservable).then((response) => {
        const paid = (
          (response || { data: { paymentConfirmSuccessful: false } }).data || { paymentConfirmSuccessful: false }
        ).paymentConfirmSuccessful;
        repositories.purchase.updatePurchase(purchase.id, { ...purchase, paid });
        streams.purchasePaid.publish({ paid: paid, id: purchase.id });
      });

      return purchase;
    },
  },
  Subscription: {
    purchasePaid: streams.purchasePaid.resolver,
  },
});
