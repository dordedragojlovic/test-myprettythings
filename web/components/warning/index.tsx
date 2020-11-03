import React from 'react';
import { PopupWindow, PopupWrapper, H1} from './styles';

function Warning({ error, onClickClose }: { error: string, onClickClose }) {
  return (
    <PopupWrapper onClick={onClickClose}>
      <PopupWindow>
        <H1><strong>Warning! </strong>{error}</H1>
      </PopupWindow>
    </PopupWrapper>
  );
}

export default Warning;