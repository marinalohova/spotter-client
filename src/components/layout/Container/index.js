import React, { Fragment } from 'react';
import Header from '../Header';
import Footer from '../Footer';

/**
 * Container layout component
 * @return {Object}
 */
const Container = ({ children }) => {
  return (
    <Fragment>
      <Header/>
      <main>
        {children}
      </main>
      <Footer/>
    </Fragment>
  );
};

export default Container;
