import styled from 'styled-components';
import { responsive } from '../styles/responsive';

export const PopupWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
`;

export const PopupWindow = styled.div`
  position: absolute;
  left: 5%;
  right: 5%;
  bottom: 1%;
  margin: auto;
  box-shadow: 8px 5px 5px rgba(0, 0, 0, 0.15);
  display: flex;
  padding: 5px 20px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 5px;
  width: 520px;
  height: 70px;
  color: #8a6d3b;
  background-color: #fcf8e3;
  border-color: #faebcc;

  form{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
  }

  ${responsive.sm} {
    left: 2%;
    right: 2%;
    width: 700px;
  }
`;
export const H1 = styled.h1`
  font-size: 1.1rem;
  font-weight: 400;
  margin: 0px;
  border: 1px solid transparent;
  border-radius: 4px;
`;