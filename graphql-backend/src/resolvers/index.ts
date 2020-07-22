import database from '../database';
import repositoriesFactory from '../repositories';
import { Resolvers } from '../generated/graphql-types';
import bankServiceFactory from '../bank-service';
import STREAMS from '../streams';
import CONFIG from '../config';
import { BankService, Repositories } from '../types';

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
      const paymentStatus = await bankService.postPayment(variables.purchase.paymentInfo, 123, 'USD');
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
      purchasePaidObservable.subscribe((paid) => {
        repositories.purchase.updatePurchase(purchase.id, { ...purchase, paid });
        streams.purchasePaid.publish({ paid: paid, id: purchase.id });
      });

      return purchase;
    },
    reset: () => {
      repositories.purchase.reset();
      return true;
    },
  },
  Subscription: {
    purchasePaid: streams.purchasePaid.resolver,
  },
});
