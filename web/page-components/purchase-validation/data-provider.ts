import { CardInfo } from './types';
import API from '../../helpers/api';
import { Observable } from 'apollo-link';

function validate(cardInfo: CardInfo): Promise<{ id: string; paid: boolean }> {
  return API.createPurchase([], cardInfo);
}
function wasPaid(purchaseId: string): Observable<boolean> {
  return API.getPurchaseObservable(purchaseId);
}

const dataProvider = {
  validate,
  wasPaid,
};

export default dataProvider;
