import React from 'react';
import Link from 'next/link';
import { Container, Logo, Text, ImageContainer } from './styles';
import MyOkayCash from 'components/icons/myOkayCash';

function PhoneCheck() {
  return (
    <Container>
      <Logo>
        <MyOkayCash />
      </Logo>
      <Link href="/purchase-complete">
        <ImageContainer>
          <img src="https://i.ibb.co/Fgt1MbB/vectorpaint.png" />
        </ImageContainer>
      </Link>
      <Text>Check your phone</Text>
    </Container>
  );
}

export default PhoneCheck;
