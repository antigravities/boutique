import React from 'react';
import ModuleList from '../modules/List';

class PageLists extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      lists: props.lists
    }
  }

  render(){
    let lists = this.state.lists.map(i => <ModuleList list={i} />)

    return (
      <div>
        <h1>Lists</h1>
        {lists}
      </div>
    );
  }
}

export default PageLists;