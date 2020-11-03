import React from 'react';
import { PopupWindow, PopupWrapper } from './styles';
import PopupBody from './phone-check';

function Popup({type}:{type: string}) {
  return (
    <PopupWrapper>
      <PopupWindow>
        <PopupBody type={type}/>
      </PopupWindow>
    </PopupWrapper>
  );
}

export default Popup;
