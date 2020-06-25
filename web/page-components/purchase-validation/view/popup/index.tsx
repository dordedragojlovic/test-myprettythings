import React from 'react';
import { PopupWindow, PopupWrapper } from './styles';
import PhoneCheck from './phone-check';

function Popup() {
  return (
    <PopupWrapper>
      <PopupWindow>
        <PhoneCheck />
      </PopupWindow>
    </PopupWrapper>
  );
}

export default Popup;
