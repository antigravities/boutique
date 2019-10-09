import React from 'react';
import ModuleList from '../../src/modules/List.js';

import { Container } from 'react-bootstrap';

import * as meta from '../../generated/meta.json';
import ModuleHeader from '../../src/modules/Header.js';
import ModuleFooter from '../../src/modules/Footer.js';

class PageLists extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      lists: meta.lists
    }
  }

  render(){
    let lists = this.state.lists.map(i => <ModuleList listID={i} />)

    return (
      <Container>
        <ModuleHeader pageTitle="Lists" />

        <h1>Lists</h1>
        {lists}

        <ModuleFooter />
      </Container>
    );
  }
}

export default PageLists;