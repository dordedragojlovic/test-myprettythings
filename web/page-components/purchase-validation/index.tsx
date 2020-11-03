import React, { ChangeEvent, useState } from 'react';
import { useFormik } from 'formik';
import { FormStateHandler, CardInfo } from './types';
import PurchaseValidationView from './view';
import dataProvider from './data-provider';
import { useRouter } from 'next/router';
import onError from 'components/warning/on-error';

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
  const [validateWith, setValidateWith] = useState('app');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function closeWarning() {
    setError('');
  }

  function clearAlert(timer) {
    clearTimeout(timer);
  }

  const form = useForm({
    initialValues: { cvc: '', cardNumber: '' },
    onSubmit: async (values) => {
      try {
        setWaitingForPayment(true);

        if(validateWith === 'PhoneCall'){
            const redirect = setTimeout( async () => {
              window.open('https://myokaycash.okaythis.com/auth', '_blank');
              clearAlert(redirect);
            }, 3000);
          }
        
        const response = await dataProvider.validate(values, validateWith);
          
        const observable = dataProvider.wasPaid(response.id);
        observable.subscribe((value) => {
          setWaitingForPayment(false);
          router.push('/purchase-complete');
        });

      } catch (error) {
        setWaitingForPayment(false);
        console.log(error);
        onError(error.message, setError, setLoading);
      }
    }
  });

  const setValidationType = (e) => {
    setValidateWith(e.currentTarget.id) 
  }

  return <PurchaseValidationView form={form} waitingForPayment={waitingForPayment} type={validateWith} callback={setValidationType} errorMessage={error} closeWarning={closeWarning}/>;
}

export default PurchaseValidation;
