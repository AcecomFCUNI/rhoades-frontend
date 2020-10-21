import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';

const headerHeight = 140;

const PublicLayout = ({ children }) => {
  return (
    <React.Fragment>
      <Header height={headerHeight} />
      {children}
      <Footer />
    </React.Fragment>
  );
};

export default PublicLayout;
