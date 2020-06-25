import React, { ChangeEvent, useState } from 'react';
import { useFormik } from 'formik';
import { FormStateHandler, CardInfo } from './types';
import PurchaseValidationView from './view';
import dataProvider from './data-provider';
import { useRouter } from 'next/router';

function useForm(configuration: { initialValues: CardInfo; onSubmit: (values: CardInfo) => void }): FormStateHandler {
  const form = useFormik<CardInfo>({
    ...configuration,
    enableReinitialize: true,
    validate: (values) => {
      const cardNumberInvalid = !values.cardNumber || values.cardNumber.length !== 16;
      const cvcInvalid = !values.cvc || values.cvc.length !== 3;
      return {
        ...(cardNumberInvalid && { cardNumber: 'Invalid card number' }),
        ...(cvcInvalid && { cardNumber: 'Invalid CVC' }),
      };
    },
  });

  const onCVCChange = (event: ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue('cvc', event.target.value);
  };
  const onCardNumberChange = (newCardNumber: string) => {
    form.setFieldValue('cardNumber', newCardNumber);
  };

  return {
    cvc: form.values.cvc,
    cardNumber: form.values.cardNumber,
    handleSubmit: form.handleSubmit,
    onCVCChange,
    onCardNumberChange,
    isSubmitting: form.isSubmitting,
    isValid: form.isValid,
  };
}

function PurchaseValidation() {
  const [waitingForPayment, setWaitingForPayment] = useState(false);
  const router = useRouter();
  const form = useForm({
    initialValues: { cvc: '', cardNumber: '' },
    onSubmit: async (values) => {
      try {
        setWaitingForPayment(true);
        const response = await dataProvider.validate(values);
        const observable = dataProvider.wasPaid(response.id);
        observable.subscribe((value) => {
          setWaitingForPayment(false);
          router.push('/purchase-complete');
        });
      } catch (error) {
        setWaitingForPayment(false);
        console.log(error);
        console.log('Something went wrong...');
      }
    },
  });

  return <PurchaseValidationView form={form} waitingForPayment={waitingForPayment} />;
}

export default PurchaseValidation;
