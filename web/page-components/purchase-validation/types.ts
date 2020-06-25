import { ChangeEvent } from 'react';

export type CardInfo = {
  cvc: string;
  cardNumber: string;
};

export type FormStateHandler = {
  cvc: string;
  cardNumber: string;
  handleSubmit: () => void;
  onCVCChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onCardNumberChange: (newCardNumber: string) => void;
  isSubmitting: boolean;
  isValid: boolean;
};
