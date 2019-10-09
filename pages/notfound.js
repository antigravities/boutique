import React from 'react';
import Link from 'next/link';

import ModuleHeader from '../src/modules/Header.js';
import ModuleFooter from '../src/modules/Footer.js';

import { Container } from 'react-bootstrap';

class PageNotFound extends React.Component {
  render(){
    return (
      <Container>
        <ModuleHeader pageTitle="Not found" />

        <h1>Oh no</h1>

        The page you requested could not be found. <Link href="/">Go home</Link>

        <ModuleFooter />
      </Container>
    )
  }
}

export default PageNotFound;