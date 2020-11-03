import styled from 'styled-components';
import { responsive } from 'components/styles/responsive';

export const PageContainer = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 80px 150px 50px 150px;

  ${responsive.sm} {
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 80px 150px 50px 150px;
  }

  ${responsive.md} {
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 100px 150px 50px 150px;
  }

  div {
    text-align: center;
    padding-top: 30px;
  }

  h1 {
    font-weight: bold;
    font-size: 67.5865px;
    line-height: 79px;
    color: #1f2a3f;
    margin: 0 0 20px 0;
  }

  h5 {
    font-weight: 500;
    font-size: 24.5769px;
    line-height: 29px;
    color: #e0a45d;
    margin: 0;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #e0a45d;
    border-radius: 41px;
    border: 0;
    height: 70px;
    width: 233px;
    margin: 0 5px;
    font-weight: 900;
    font-size: 17px;
    line-height: 29px;
    color: #ffffff;
    box-shadow: -4px 6px 5px 0px #cccccc;

    p{
      margin: 0;
    }

    :disabled {
      opacity: 0.5;
    }
  }
`;

export const OrderWrapper = styled.div`
    padding: 0 150px;

    h3{
      margin: 0;
    }
`;

export const OrderList = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 0 0 0;
  margin-top: 10px;
  border-top: 1.32709px solid #E1E1E1;
  border-bottom: 1.32709px solid #E1E1E1;
  justify-content: space-between;

  p{
    font-size: 20px;
    line-height: 42px;
    color: #1F2A3F;
  }
`;

export const CardContainer = styled.div`
  width: 12%;


  ${responsive.sm} {
    width: 25%;
  }
  ${responsive.md} {
    width: 20%;
  }
  ${responsive.iPadPro} {
    width: 20%;
  }
`;

export const Item = styled.div`
  width: 50%;
  height: 90px;
  display: flex;
  justify-content: start;
`;

export const ButtonsContainer = styled.div`
  display: flex;

`;

