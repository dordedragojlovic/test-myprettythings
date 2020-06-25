import React from 'react';
import Link from 'next/link';
import MenuIcon from '../icons/menu';
import ShoppingCart from '../icons/shoppingCart';


import { Container, IconContainer, Title } from './styles';

const Header = () => {
  return (
  <Container>
      <IconContainer><MenuIcon/></IconContainer>
      <Title>
        <Link href="/">
          <div>
            <p>Pretty</p><p>Things</p>
          </div>
        </Link>
      </Title>
      <IconContainer><ShoppingCart/></IconContainer>
  </Container>
  );
};

export default Header;
