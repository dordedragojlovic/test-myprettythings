import styled from 'styled-components';
import { responsive } from 'components/styles/responsive';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const Logo = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
`;

export const Text = styled.div`
  font-weight: 900;
  font-size: 55px;
  line-height: 64px;
  text-align: center;
  color: #FFFFFF;

  ${responsive.xs} {
    font-size: 35px;
  }
`;

export const ImageContainer = styled.div`
  margin: 0 auto;
  margin-top: 80px;
  margin-bottom: 25px;
  img{
    height: 160px;
  }
`;
