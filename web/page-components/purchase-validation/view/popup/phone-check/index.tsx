import React from 'react';
import Link from 'next/link';
import { Container, Logo, Text, ImageContainer } from './styles';
import MyOkayCash from 'components/icons/myOkayCash';

function PhoneCheck({type}:{type: string}) {
  const text = type === 'MobileApp' ? 'Check your phone' : 'You will be redirected to MyOkayCash Bank website for code confirmation.'
  return (
    <Container>
      <Logo>
        <MyOkayCash />
      </Logo>
      {
        type === 'MobileApp' &&
        (
          <Link href="/purchase-complete">
            <ImageContainer>
              <img src="https://i.ibb.co/Fgt1MbB/vectorpaint.png" />
            </ImageContainer>
          </Link>
        )
      }
      <Text type={type}>{text}</Text>
    </Container>
  );
}

export default PhoneCheck;
