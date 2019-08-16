import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';

class ModuleIcon extends React.Component {
  constructor(props){
    super(props);

    this.state = { awesome: props.awesome };
  }

  render(){
    return (
      <span className={"fas " + this.state.awesome}></span>
    )
  }
}

export default ModuleIcon;