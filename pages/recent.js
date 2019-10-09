import React from 'react';
import ModuleShort from '../src/modules/Short.js';

import { Container } from 'react-bootstrap';
import ModuleHeader from '../src/modules/Header.js';
import ModuleFooter from '../src/modules/Footer.js';

class PageRecent extends React.Component {
  constructor(props){
    super(props);

    this.state = { recent: props.recent || null };
  }

  async componentDidMount(){
    this.setState({ recent: await (await fetch("/static/generated/recent.json")).json() });
  }

  // https://spectrum.chat/next-js/general/how-can-i-fetch-data-from-local-json-files~c814e22e-40bd-4c0c-af9c-8094148228da
  static async getInitialProps(context){
    if( context.req ){
      return { recent: (await import("../generated/recent.json")).default };
    }
    else {
      return { recent: window.__NEXT_DATA__.props.pageProps.recent };
    }
  }

  render(){
    if( ! this.state.recent ) return null;

    let recent = Object.keys(this.state.recent).map(i => this.state.recent[i]);

    return (
      <Container>
        <ModuleHeader pageTitle="Recent Reviews" />

        <h1>Recent</h1> {recent.map((i,j) => <ModuleShort key={"app-" + i.id} app={i} side={j%2 == 0 ? "left" : "right" } />)}

        <ModuleFooter />
      </Container>
    );
  }
}

export default PageRecent;