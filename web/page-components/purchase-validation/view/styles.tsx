import styled from 'styled-components';
import { responsive } from 'pages/styles/responsive';

export const PageContainer = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 150px 150px 0 150px;

  ${responsive.sm} {
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 80px 150px 0 150px;
  }

  ${responsive.md} {
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 100px 150px 0 150px;
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
    margin: 0 0 50px 0;
  }

  h5 {
    font-weight: 500;
    font-size: 24.5769px;
    line-height: 29px;
    color: #e0a45d;
    margin: 0;
  }

  button {
    background: #e0a45d;
    border-radius: 41px;
    border: 0;
    height: 70px;
    width: 233px;
    font-weight: 900;
    font-size: 25px;
    line-height: 29px;
    color: #ffffff;

    :disabled {
      opacity: 0.5;
    }
  }
`;
