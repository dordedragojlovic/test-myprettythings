import React from 'react';
import Link from 'next/link';
import Card from '../../components/card';
import { PageContainer, CardContainer } from './styles';

function ProductList() {
  const numOfItems = 8;

  return (
    <PageContainer>
      {[...Array(numOfItems)].map((e, i) => (
        <Link href="/product-detail" key={i}>
          <CardContainer>
            <Card heigh={415} width={285} showText={true} />
          </CardContainer>
        </Link>
      ))}
    </PageContainer>
  );
}

export default ProductList;
