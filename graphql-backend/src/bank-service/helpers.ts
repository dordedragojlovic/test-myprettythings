import { FetchResult } from 'apollo-link';

export function paidFromFetchResult(value: FetchResult): boolean {
  if (!value || !value.data) {
    return false;
  }

  return !!value.data.paymentConfirmSuccessful;
}
