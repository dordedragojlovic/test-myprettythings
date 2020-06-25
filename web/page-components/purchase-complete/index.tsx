import React from 'react';
import Card from '../../components/card';
import { PageContainer, Text, OrderList, OrderDetails, CardContainer } from './styles';

function PurchaseComplete() {

  return (
    <PageContainer>
      <Text>
        <h1>Purchase complete</h1>
        <h5>Thank you for you order, your package will be packed and shipped within 24 hours</h5>
      </Text>
      <OrderList>
        <CardContainer>
          <Card heigh={165} width={120} showText={false}/>
        </CardContainer>
        <div>
          <p>Pretty chair</p>
          <p>123 $</p>
        </div>
      </OrderList>
      <OrderDetails>
        <div>
          <p>shiping</p>
          <p>tax</p>
          <p>Total</p>
        </div>
        <div>
          <p>0 $</p>
          <p>10 $</p>
          <p>123 $</p>
        </div>
      </OrderDetails>

    </PageContainer>
  );
}

export default PurchaseComplete;
