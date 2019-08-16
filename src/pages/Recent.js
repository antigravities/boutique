import React from 'react';
import ModuleShort from '../modules/Short';

class PageRecent extends React.Component {
  constructor(props){
    super(props);

    this.state = { recent: null };
  }

  async componentDidMount(){
    this.setState({ recent: await (await fetch("/generated/recent.json")).json() });
  }

  render(){
    if( ! this.state.recent ) return null;

    return (<div><h1>Recent</h1> {this.state.recent.map((i,j) => <ModuleShort app={i} side={j%2 == 0 ? "left" : "right" } />)}</div>);
  }
}

export default PageRecent;