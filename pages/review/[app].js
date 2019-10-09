import React from 'react';

import { Container } from 'react-bootstrap';

import PageNotFound from '../NotFound.js';
import ModuleDisqus from '../../src/modules/Comments.js';
import ModuleHeader from '../../src/modules/Header.js';
import ModuleFooter from '../../src/modules/Footer.js';

import ModuleRecommendationIcon from '../../src/modules/RecommendationIcon';

import * as Router from 'next/router';
import * as meta from '../../generated/meta.json';

class PageReview extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      item: props.item || null,
      notfound: false,
      meta: meta.default,
      rid: props.router.query.app
    };
  }

  //async componentDidMount(){
  //  try {
  //    let json = await (await fetch("/static/generated/review/" + this.state.rid + ".json")).json();
  //    this.setState({item: json});
  //  } catch(e){
  //   this.setState({ item: true, notfound: true });
  //  }
  //}

  // https://spectrum.chat/next-js/general/how-can-i-fetch-data-from-local-json-files~c814e22e-40bd-4c0c-af9c-8094148228da
  static async getInitialProps(context){
    if( context.req ) return { item: await import("../../generated/review/" + context.query.app + ".json") };
    else return window.__NEXT_DATA__.props.pageProps.item;
  }
  
  render(){
    if( ! this.state.item ) return null;
    if( this.state.notfound ) return <PageNotFound />;

    let author = this.state.item.author ? <p>By <b>{this.state.item.author}</b></p> : "";

    let months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

    let rdate = new Date(this.state.item.reviewdate);
    let date = months[rdate.getMonth()] + " " + rdate.getDate() + ", " + rdate.getFullYear();

    let comments = this.state.meta.disqus && this.state.meta.disqus.length > 0 ? <div><hr /><ModuleDisqus dqtag={this.state.meta.disqus} /></div> : "";

    return (
      <Container>
        <ModuleHeader pageTitle={this.state.item.title} />

        <div className="b-head-wrapper">
          <div className="b-head-nameplate">
            <h1>{this.state.item.title}</h1>
            <span>By <b dangerouslySetInnerHTML={{__html: this.state.item.author}}></b> &middot; {date}</span>
          </div>
          <img className="w-100" src={this.state.item.image[Math.floor(Math.random()*this.state.item.image.length)]} />
        </div>

        <hr />

        <div dangerouslySetInnerHTML={{__html: this.state.item.long}} />

        <hr />

        <ModuleRecommendationIcon rec={this.state.item.recommended} text={true}></ModuleRecommendationIcon><br /><br />

        <i>{this.state.item.short}</i>

        <hr />

        <a href={"https://store.steampowered.com/app/" + this.state.item.id + "?curator_clanid=" + this.state.meta.id} target="_blank">Buy {this.state.item.title} on Steam</a>

        {comments}

        <ModuleFooter />
      </Container>
    );
  }
}

export default Router.withRouter(PageReview);