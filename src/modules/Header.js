import 'bootstrap/dist/css/bootstrap.css';
import '../../src/styles/boutique.css';

import React from 'react';

import { Row, Col } from 'react-bootstrap';
import Link from "next/link";
import Head from 'next/head';

import ModuleIcon from './Icon';

import * as meta from '../../generated/meta.json';

class ModuleHeader extends React.Component {
  constructor(props){
    super(props);

    this.state = { meta: meta.default, pageTitle: props.pageTitle || meta.default.name, pageDescription: props.pageDescription || meta.default.description };
  }


  render(){
    if( ! this.state.meta ) return null;

    let font = "";
    let fontStyle = {};

    if( meta.titleFont ){
      font = (
        <link rel="stylesheet" href={"https://fonts.googleapis.com/css?family=" + meta.titleFont.replace(/ /g, "+")} />
      )

      fontStyle = { fontFamily: meta.titleFont };
    }

    return (
      <div>
        <Head>
          <title>{(this.props.pageTitle ? (this.props.pageTitle + " - ") : "" ) + this.state.meta.name}</title>

          <link rel="shortcut icon" href={this.state.meta.avatar} />
          
          <meta property="og:site_name" content={this.state.meta.name} />
          <meta property="og:author" content={this.state.meta.name} />
          <meta property="og:title" content={this.props.pageTitle} />
          <meta property="og:description" content={this.props.pageDescription} />

          <meta name="description" content={this.props.pageDescription} />

          {font}
        </Head>

        <div className="text-center b-brand">
          <h2 style={fontStyle}>{this.state.meta.name}</h2>
        </div>
        <hr />
        <Row>
          <Col><h5 className="text-center"><Link href="/"><a><ModuleIcon awesome="fa-home"></ModuleIcon> Home</a></Link></h5></Col>
          <Col><h5 className="text-center"><Link href="/list"><a><ModuleIcon awesome="fa-list"></ModuleIcon> Lists</a></Link></h5></Col>
          <Col><h5 className="text-center"><Link href="/recent"><a><ModuleIcon awesome="fa-clock"></ModuleIcon> Recent</a></Link></h5></Col>
        </Row>
        <hr />
      </div>
    );
  }
}

export default ModuleHeader;