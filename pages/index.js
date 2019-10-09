import React from 'react';

import ModuleCarousel from '../src/modules/Carousel';
import ModuleList from '../src/modules/List';

import fetch from 'isomorphic-unfetch';

import * as meta from '../generated/meta.json';

import ModuleHeader from '../src/modules/Header.js';
import ModuleFooter from '../src/modules/Footer.js';

import { Container } from 'react-bootstrap';

class PageIndex extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      recent: props.recent || null,
      lists: meta.default.lists
    }

  }

  async componentDidMount(){
    try {
      this.setState({ meta: meta.default, recent: await (await fetch("/static/generated/recent.json")).json() });
    } catch(e){
      console.log(e);
    }
  }

  // https://spectrum.chat/next-js/general/how-can-i-fetch-data-from-local-json-files~c814e22e-40bd-4c0c-af9c-8094148228da
  static async getInitialProps(context){
    if( context.req ) return { recent: (await import("../generated/recent.json")).default };
    else{
      console.log(window.__NEXT_DATA__.props.pageProps.recent);
      return window.__NEXT_DATA__.props.pageProps.recent || {};
    }
  }

  render(){
    if( ! this.state.recent ) return null;

    // unfortunately this will not SSR, TODO: figure this out
    let lists = meta.default.lists.slice(0,3).map(i => <ModuleList listID={i} key={i.id}></ModuleList>);

    return (
      <Container>
        <ModuleHeader />

        <ModuleCarousel 
          apps={this.state.recent.slice(0,5)}
        />

        {lists}

        <ModuleFooter />
      </Container>
    )
  }
}

export default PageIndex;