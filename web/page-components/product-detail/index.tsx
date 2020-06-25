import React from 'react';
import Router from 'next/router';
import Link from 'next/link';
import Card from '../../components/card';
import { Title, PageContainer, CardWrapper, ContentWrapper, Text, PaymentMethod } from './styles';

function ProductDetails() {

  return (
    <PageContainer>
      <CardWrapper>
        <Card heigh={630} width={400} showText={false}/>
      </CardWrapper>
      <ContentWrapper>
          <Title>Pretty chair</Title>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
          </Text>
          <PaymentMethod>
            <Link href="/purchase-validation" >
              <div>
                <img src="https://i.ibb.co/KjhKxsZ/credit-Cards.png" alt="Credit Cards"/>
              </div>
            </Link>
            <p>123$</p>
          </PaymentMethod>
      </ContentWrapper>
    </PageContainer>
  );
}

export default ProductDetails;