import React from 'react';
import { FormStateHandler } from '../types';
import { PageContainer } from './styles';
import CreditCard from './credit-card';
import Popup from './popup';

function PurchaseValidationView({ form, waitingForPayment }: { form: FormStateHandler; waitingForPayment: boolean }) {
  return (
    <>
      {waitingForPayment && <Popup />}
      <form onSubmit={form.handleSubmit}>
        <PageContainer>
          <CreditCard form={form} />
          <div>
            <h5>Enter your credit card details</h5>
            <h1>Purchase</h1>
            <button disabled={!form.isValid} type={'submit'}>
              VALIDATE
            </button>
          </div>
        </PageContainer>
      </form>
    </>
  );
}

export default PurchaseValidationView;
