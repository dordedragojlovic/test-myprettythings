import styled from 'styled-components';
import { responsive } from 'components/styles/responsive';

export const PopupWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const PopupWindow = styled.div`
  position: absolute;
  left: 5%;
  right: 5%;
  top: 25%;
  bottom: 25%;
  margin: auto;
  box-shadow: 8px 5px 5px rgba(0, 0, 0, 0.15);
  display: flex;
  padding: 40px 50px;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  height: fit-content;
  background: #1F2A3F;
  border-radius: 31px;
  width: 860px;

  ${responsive.xs} {
    left: 2%;
    right: 2%;
    width: 350px;
  }

  ${responsive.sm} {
    left: 2%;
    right: 2%;
    width: 640px;
  }


`;