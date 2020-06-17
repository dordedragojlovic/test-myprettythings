import database from '../database';
import repositoriesFactory from '../repositories';
import { PurchaseInput, PurchaseStatus, Resolvers } from 'generated/graphql-types';

export type Repositories = {
  purchase: PurchaseRepository;
};

export type PurchaseRepository = {
  get: (id: string) => PurchaseStatus;
  createPurchase: (purchase: PurchaseInput) => PurchaseStatus;
};

export default (repositories: Repositories = repositoriesFactory(database)): Resolvers => ({
  Query: {
    purchase: (_, variables) => repositories.purchase.get(variables.id),
  },
  Mutation: {
    createPurchase: (_, variables) => repositories.purchase.createPurchase(variables.purchase),
  },
});
