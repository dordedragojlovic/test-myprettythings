import defaultDB from '../database';
import { PURCHASES } from '../database/collections';
import { PurchaseInput, PurchaseItem, PurchaseStatus } from 'generated/graphql-types';
import { PurchaseRepository } from '../types';

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

  function createPurchase(purchase: PurchaseInput, paymentId: string, paid: boolean): PurchaseStatus {
    const document = PURCHASES_COLLECTION.insert({ confirmed: false, paid, items: purchase.items, paymentId });
    return mapToPurchase(document);
  }

  function get(id: string): PurchaseStatus {
    const document = PURCHASES_COLLECTION.get(parseInt(id));
    return mapToPurchase(document);
  }

  function updatePurchase(id: string, fieldsToUpdate: { paid: boolean; confirmed: boolean }): PurchaseStatus {
    const document = PURCHASES_COLLECTION.get(parseInt(id));
    const result = PURCHASES_COLLECTION.update({ ...document, ...fieldsToUpdate });
    return mapToPurchase(result);
  }

  return {
    createPurchase,
    get,
    updatePurchase,
  };
}
