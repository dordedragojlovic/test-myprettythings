import React from 'react';
import { FormStateHandler } from '../types';
import { PageContainer, OrderWrapper, OrderList, Item, CardContainer } from './styles';
import CreditCard from './credit-card';
import Card from 'components/card';
import Popup from './popup';

function PurchaseValidationView({ form, waitingForPayment }: { form: FormStateHandler; waitingForPayment: boolean }) {
  return (
    <>
      {waitingForPayment && <Popup />}
      <OrderWrapper>
        <h3>Items in cart:</h3>
        <OrderList>
          <Item>
            <CardContainer>
              <Card heigh={40} width={35} showText={false}/>
            </CardContainer>
            <p>Pretty chair</p>
          </Item>
          <p>123 $</p>
        </OrderList>
      </OrderWrapper>
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
