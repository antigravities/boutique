import React from 'react';

import ModuleShort from '../modules/Short';
import PageNotFound from './NotFound';

class PageList extends React.Component {
  constructor(props){
    super(props);

    this.state = { list: null };
  }

  async componentDidMount(){
    try {
      this.setState({list: await (await fetch("/generated/list/" + this.props.match.params.id + ".json")).json() });
    } catch(e){
      console.log(e);
      this.setState({list: true, notfound: true});
    }
  }

  render(){
    if( ! this.state.list ) return null;
    if( this.state.notfound ) return <PageNotFound />;

    return (<div><h1>{this.state.list.title}</h1><h4>{this.state.list.description}</h4> {this.state.list.apps.map((i,j) => <ModuleShort app={i} side={j%2 == 0 ? "left" : "right" } />)}</div>);
  }
}

export default PageList;