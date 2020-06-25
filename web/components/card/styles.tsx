import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background-image: url('https://i.ibb.co/0r6dhGw/Chair-4.png');
  height: ${p => (`${p.height}px`)};
  width: ${p => (`${p.width}px`)};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
  padding: 20px 0 20px 20px;
  margin-bottom: 35px;
  cursor: pointer;
`;

export const Title = styled.div`
  color: white;
`;

export const Price = styled.div`
  color: white;
`;
