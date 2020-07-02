import styled from 'styled-components';
import { responsive } from 'pages/styles/responsive';

export const PageContainer = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
  padding: 0 150px;
`;

export const OrderList = styled.div`
  display: flex;
  width: 100%;
  padding: 30px 0 0 0;
  margin-top: 30px;
  margin-bottom: 30px;
  border-top: 1.32709px solid #E1E1E1;
  border-bottom: 1.32709px solid #E1E1E1;

  div{
    display: flex;
    flex-direction: column;
    justify-content: end;
  }

  p{
    font-weight: bold;
    font-size: 26.5419px;
    line-height: 31px;
    color: #1F2A3F;
  }

  p:last-of-type{
      ${responsive.sm} {
        margin-top: 0;
      }
    }
`;

export const OrderDetails = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: flex-end;

  p{
    margin: 0;
  }

  p:first-of-type{
      height: 20px;
    }

  div:last-of-type {
    text-align: right;
    margin-left: 30px;

    p:first-of-type{
      height: 20px;
    }

    p:last-of-type{
      font-weight: bold;
      color: #1F2A3F;
    }
  }
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  h1{
    font-weight: bold;
    font-size: 53.0838px;
    line-height: 62px;
    color: #1F2A3F;
    margin: 50px 0 0 0;
    ${responsive.sm} {
      font-size: 47px;
      line-height: 55px;
    }
  }

  h5{
    font-weight: normal;
    font-size: 23.8877px;
    line-height: 28px;
    color: #1F2A3F;
    margin: 0;
  }
`;

export const CardContainer = styled.div`
  width: 15%;

  ${responsive.sm} {
    width: 37%;
  }
  ${responsive.md} {
    width: 37%;
  }
  ${responsive.iPadPro} {
    width: 37%;
  }
`;