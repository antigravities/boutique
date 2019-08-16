import React from 'react';

import PageNotFound from './NotFound.js';
import ModuleDisqus from '../modules/Comments.js';

import '../styles/review.css';
import ModuleRecommendationIcon from '../modules/RecommendationIcon.js';

class PageReview extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      item: null,
      notfound: false,
      meta: props.meta
    };
  }

  async componentDidMount(){
    try {
      let json = await (await fetch("/generated/review/" + this.props.match.params.id + ".json")).json();
      this.setState({item: json});
    } catch(e){
      this.setState({ item: true, notfound: true });
    }
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
      <div>
        <div class="b-head-wrapper">
          <div class="b-head-nameplate">
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
      </div>
    );
  }
}

export default PageReview;