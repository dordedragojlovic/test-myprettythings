import React from 'react';
import { FormStateHandler } from '../types';
import { PageContainer, OrderWrapper, OrderList, Item, CardContainer, ButtonsContainer } from './styles';
import CreditCard from './credit-card';
import Card from 'components/card';
import Popup from './popup';
import Phone from 'components/icons/phone';
import SmartPhone from 'components/icons/smartPhone';
import IconButton from 'components/icon-button';
import Warning from 'components/warning';

function PurchaseValidationView({ form, waitingForPayment, type, callback, errorMessage, closeWarning }: { form: FormStateHandler; waitingForPayment: boolean, type: string, callback, errorMessage: string, closeWarning }) {
  return (
    <>
      {waitingForPayment && <Popup type={type}/>}
      {!!errorMessage && (
        <Warning onClickClose={closeWarning} error={errorMessage} />
      )}
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
            <ButtonsContainer>
              <IconButton disabled={!form.isValid} icon={SmartPhone} text={"APP VALIDATION"} callback={callback} id={"MobileApp"}/>
              <IconButton disabled={!form.isValid} icon={Phone} text={"CALL VALIDATION"} callback={callback} id={"PhoneCall"}/>
            </ButtonsContainer>
          </div>
        </PageContainer>
      </form>
    </>
  );
}

export default PurchaseValidationView;
