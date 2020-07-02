import styled from 'styled-components';
import { responsive } from 'pages/styles/responsive';


export const PageContainer = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 0 150px;
  justify-content: space-evenly;

  ${responsive.sm} {
        justify-content: center;
    }


`;

export const CardContainer = styled.div`
  width: 32%;

  ${responsive.sm} {
      width: 100%;
      display: flex;
      justify-content: center;
  }

  ${responsive.md} {
      width: 42%;
  }

  ${responsive.iPadPro} {
    width: 42%;
  }

  ${responsive.lg} {
    width: 24%;
  }

  ${responsive.xl} {
    width: 24%;
  }


`;
