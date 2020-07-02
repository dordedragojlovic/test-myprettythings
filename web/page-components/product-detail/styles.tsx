import styled from 'styled-components';
import { responsive } from 'pages/styles/responsive';


export const PageContainer = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 0 150px;

  ${responsive.sm} {
      flex-direction: column;
      padding: 100px 60px;
    }

  ${responsive.md} {
    padding: 50px 60px;
  }

  ${responsive.iPadPro} {
      padding: 150px 10px;
    }
`;

export const Title = styled.div`
  font-family: Roboto;
  font-weight: bold;
  font-size: 68.0251px;
  line-height: 80px;
  color: #1F2A3F;
  margin: 20px 0;
`;

export const CardWrapper = styled.div`
  width: 45%;
  div{
    margin: 0 auto;
  }
  ${responsive.sm} {
      width: 100%;
    }
`;

export const ContentWrapper = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding: 90px 0;

  ${responsive.sm} {
      width: 100%;
    }
`;

export const Text = styled.div`
  font-family: sans-serif;
  font-weight: normal;
  font-size: 14.5768px;
  line-height: 17px;
  color: #1F2A3F;
  width: 75%;
  margin-bottom: 40px;
`;

export const PaymentMethod = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 0.971787px solid #C6C6C6;
  align-items: center;

  p{
    font-weight: bold;
    font-size: 34.0125px;
    color: #1F2A3F;
    margin-top: 20px;
  }

  img{
    height: fit-content;
    cursor: pointer;
  }
`;