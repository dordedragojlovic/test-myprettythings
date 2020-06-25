import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 150px 0 150px;
  position: fixed;
  top: 0;
  width: -webkit-fill-available;
  height: 80px;
  background-color: #ebebeb;
`;

export const Title = styled.div`
  cursor: pointer;
  p {
    font-family: Lobster, cursive;
    font-style: normal;
    font-weight: normal;
    font-size: 34.5259px;
    line-height: 43px;
    color: #1f2a3f;
    margin: 0;
  }
  p:last-of-type {
    position: absolute;
    top: 47px;
    margin-left: 20px;
  }
`;

export const IconContainer = styled.div`
  margin-top: 20px;
`;
