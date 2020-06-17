import defaultDB from '../database';
import { PURCHASES } from '../database/collections';
import { PurchaseInput, PurchaseItem, PurchaseStatus } from 'generated/graphql-types';
import { PurchaseRepository } from '../resolvers';

function mapToPurchase(document: {
  $loki: number;
  confirmed: boolean;
  paid: boolean;
  items: PurchaseItem[];
}): PurchaseStatus {
  return { ...document, id: document.$loki.toString() };
}

export default function purchaseRepositoryFactory(database = defaultDB): PurchaseRepository {
  const PURCHASES_COLLECTION = database.getCollection(PURCHASES);

  function createPurchase(purchase: PurchaseInput): PurchaseStatus {
    const document = PURCHASES_COLLECTION.insert({ confirmed: false, paid: false, items: purchase.items });
    return mapToPurchase(document);
  }

  function get(id: string): PurchaseStatus {
    const document = PURCHASES_COLLECTION.get(parseInt(id));
    return mapToPurchase(document);
  }

  return {
    createPurchase,
    get,
  };
}
