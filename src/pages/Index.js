import React from 'react';

import ModuleCarousel from '../modules/Carousel.js';
import ModuleList from '../modules/List';

class PageIndex extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      recent: null,
      lists: props.lists
    }

  }

  async componentDidMount(){
    try {
      this.setState({ lists: this.state.lists, recent: await (await fetch("/generated/recent.json")).json() });
    } catch(e){
      console.log(e);
    }
  }

  render(){
    if( ! this.state.recent ) return null;

    let lists = this.state.lists.slice(0,3).map(i => <ModuleList list={i} key={i.id}></ModuleList>);

    return (
      <div>
        <ModuleCarousel 
          apps={this.state.recent.slice(0,5)}
        />
        {lists}
      </div>
    )
  }
}

export default PageIndex;