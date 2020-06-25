import React from 'react';
import { Container, Title, Price } from './styles';

const Card = ({ heigh, width, showText }: { heigh: number, width: number, showText: boolean }) => {
  return (
  <Container height={heigh} width={width}>
    {!!showText && <Title>Pretty</Title>}
    {!!showText && <Price>123 $</Price>}
  </Container>
  );
};

export default Card;
