import React, { useRef } from 'react';
import { Container, CVC, CardNumber } from './styles';
import { FormStateHandler } from 'page-components/purchase-validation/types';

const CreditCard = ({ form }: { form: FormStateHandler }) => {
  const firstInputRef = useRef(null);
  const secondInputRef = useRef(null);
  const thirdInputRef = useRef(null);
  const fourthInputRef = useRef(null);
  const fourthValue = form.cardNumber.slice(12, 16);
  const thirdValue = form.cardNumber.slice(8, 12);
  const secondValue = form.cardNumber.slice(4, 8);

  return (
    <Container>
      <CVC>
        <input value={form.cvc} onChange={form.onCVCChange} placeholder={'CVC'} />
      </CVC>
      <CardNumber>
        <input
          ref={firstInputRef}
          placeholder={'....'}
          value={form.cardNumber.slice(0, 4)}
          onChange={(event) => {
            const newValue = event.target.value;
            form.onCardNumberChange(newValue + form.cardNumber.slice(4));
            if (newValue.length === 4) {
              secondInputRef.current.focus();
            }
          }}
        />
        <input
          ref={secondInputRef}
          placeholder={'....'}
          onKeyDown={(event) => {
            if (event.keyCode === 8 && secondValue === '') {
              firstInputRef.current.focus();
            }
          }}
          value={secondValue}
          onChange={(event) => {
            const newValue = event.target.value;
            form.onCardNumberChange(form.cardNumber.slice(0, 4) + newValue + form.cardNumber.slice(8));
            if (newValue.length === 4) {
              thirdInputRef.current.focus();
            }
          }}
        />
        <input
          placeholder={'....'}
          ref={thirdInputRef}
          onKeyDown={(event) => {
            if (event.keyCode === 8 && thirdValue === '') {
              secondInputRef.current.focus();
            }
          }}
          value={thirdValue}
          onChange={(event) => {
            const newValue = event.target.value;
            form.onCardNumberChange(form.cardNumber.slice(0, 8) + newValue + form.cardNumber.slice(12));
            if (newValue.length === 4) {
              fourthInputRef.current.focus();
            }
          }}
        />
        <input
          ref={fourthInputRef}
          onKeyDown={(event) => {
            if (event.keyCode === 8 && fourthValue === '') {
              thirdInputRef.current.focus();
            }
          }}
          placeholder={'....'}
          value={fourthValue}
          onChange={(event) => {
            const newValue = event.target.value;
            form.onCardNumberChange(form.cardNumber.slice(0, 12) + newValue);
          }}
        />
      </CardNumber>
    </Container>
  );
};

export default CreditCard;
