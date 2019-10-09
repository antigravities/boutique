import React from 'react';

import { Container } from 'react-bootstrap';

import ModuleHeader from './modules/Header.js';
import ModuleFooter from './modules/Footer.js';

import PageIndex from './pages/Index.js';
import PageNotFound from './pages/NotFound.js';
import PageReview from './pages/Review.js';
import PageLists from './pages/Lists.js';
import PageRecent from './pages/Recent.js';
import PageList from './pages/List.js';
import ModuleAdsense from './modules/GoogleAdsense.js';

import './styles/boutique.css';

class Boutique extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      meta: null
    }
  }

  async componentDidMount(){
    this.setState({ meta: await (await fetch("/generated/meta.json")).json() });
    
    if( this.state.meta.titleFont ){
      let link = document.querySelector("link");
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css?family=" + this.state.meta.titleFont.replace(/ /g, "+");

      document.querySelector("head").appendChild(link);
      document.querySelector(".b-brand").setAttribute("style", "font-family: " + this.state.meta.titleFont);
    }

    //document.querySelector("head").removeChild(document.querySelector("#icon")); // i dunno either
    

  }

  render(){
    if( ! this.state.meta ) return null;

    document.title = this.state.meta.name;

    return (
      <Router>
        <Container>
          <ModuleHeader meta={this.state.meta} />
          <ModuleAdsense meta={this.state.meta} />
          <Switch>
            <Route exact path="/" render={props => <PageIndex {...props} lists={this.state.meta.lists} />} />
            <Route exact path="/list" render={props => <PageLists {...props} lists={this.state.meta.lists} />} />
            <Route path="/list/:id" component={PageList} />
            <Route path="/review/:id" render = {props => <PageReview {...props} meta={this.state.meta} /> }/>
            <Route path="/recent" render = {props => <PageRecent {...props} meta={this.state.meta} /> }/>
            <Route component={PageNotFound}></Route>
          </Switch>
          <ModuleFooter meta={this.state.meta} />
        </Container>
      </Router>
    )
  }
}

export default Boutique;