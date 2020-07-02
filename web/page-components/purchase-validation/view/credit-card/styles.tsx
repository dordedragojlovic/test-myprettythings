import styled from 'styled-components';
import { responsive } from 'pages/styles/responsive';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 420px;
  height: 235px;
  border-radius: 20px;
  background-color: #d6d6d6;
  padding: 30px 50px;

  ${responsive.sm} {
    margin-bottom: 60px;
  }
  ${responsive.md} {
    margin-bottom: 60px;
  }
`;

export const CVC = styled.div`
  display: flex;
  width: 100%;
  input {
    background: #fdb52e;
    border: none;
    border-radius: 10px;
    width: 75px;
    height: 40px;
    text-align: center;
    font-weight: 500;
    font-size: 30px;

    ::placeholder {
      color: white;
      opacity: 0.3;
    }
  }
`;

export const CardNumber = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  input {
    width: 75px;
    height: 40px;
    border: 0;
    border-radius: 10px;
    font-weight: 500;
    font-size: 30px;
    ::placeholder {
      font-size: 32px;
      font-weight: 500;
      text-align: center;
    }
  }
`;
