import React from 'react';
import { IconWrapper} from './styles';

const IconButton = ({ disabled, icon, text, callback, id }: { disabled: boolean, icon, text:string, callback, id:string }) => {
    
  let Icon = icon;
  
  return (
    <button id={id} disabled={disabled} type={'submit'} onClick={callback}>
      <IconWrapper>
        <Icon/>
      </IconWrapper>
      <p>{text}</p>
  </button>
  );
};

export default IconButton;
