import { CardInfo } from './types';
import API from '../../helpers/api';
import { Observable } from 'apollo-link';

function validate(cardInfo: CardInfo, authType): Promise<{ id: string; confirmed: boolean }> {
  return API.createPurchase([], {...cardInfo, authType});
}
function wasPaid(purchaseId: string): Observable<boolean> {
  return API.getPurchaseObservable(purchaseId);
}

const dataProvider = {
  validate,
  wasPaid,
};

export default dataProvider;
