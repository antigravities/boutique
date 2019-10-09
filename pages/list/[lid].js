import React from 'react';

import ModuleShort from '../../src/modules/Short.js';
import PageNotFound from '../NotFound.js';

import * as Router from 'next/router';
import ModuleHeader from '../../src/modules/Header.js';
import ModuleFooter from '../../src/modules/Footer.js';

import { Container } from 'react-bootstrap';

class PageList extends React.Component {
  constructor(props){
    super(props);

    this.state = { list: props.list || null, lid: props.router.query.lid };
  }

  async componentDidMount(){
    try {
      this.setState({list: await (await fetch("/static/generated/list/" + this.state.lid + ".json")).json() });
    } catch(e){
      console.log(e);
      this.setState({list: true, notfound: true});
    }
  }

  // https://spectrum.chat/next-js/general/how-can-i-fetch-data-from-local-json-files~c814e22e-40bd-4c0c-af9c-8094148228da
  static async getInitialProps(context){
      if( context.req ) return { list: await import("../../generated/list/" + context.query.lid + ".json") };
      else return window.__NEXT_DATA__.props.pageProps.list;
    }

  render(){
    if( ! this.state.list ) return null;
    if( this.state.notfound ) return <PageNotFound />;

    return (
      <Container>
        <ModuleHeader pageTitle={this.state.list.title} />
        
        <h1>{this.state.list.title}</h1>
        <h4>{this.state.list.description}</h4>
        
        {this.state.list.apps.map((i,j) => <ModuleShort app={i} side={j%2 == 0 ? "left" : "right" } />)}
        
        <ModuleFooter />
      </Container>
    );
  }
}

export default Router.withRouter(PageList);