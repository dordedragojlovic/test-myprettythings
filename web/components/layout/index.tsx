import React from 'react';
import Header from '../header';
import globalStyles from './global';

function Layout({ children }) {
  return (
    <div className="page-layout">
      <Header />
      <div className="page-wrapper">{children}</div>
      <style jsx global>
        {globalStyles}
      </style>
      <link href="https://fonts.googleapis.com/css?family=Lobster&subset=latin,latin-ext" rel="stylesheet" />
    </div>
  );
}

export default Layout;
