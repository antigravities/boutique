import React from 'react';

import ModuleIcon from './Icon';

const rec = {
  "-1": [ "fa-thumbs-down", "#a33900", "Not Recommended" ],
  "0": [ "fa-info", "#e5eb38", "Informational" ],
  "1": [ "fa-thumbs-up", "#0068c9", "Recommended" ]
};

class ModuleRecommendationIcon extends React.Component {
  constructor(props){
    super(props);

    this.state = { icon: rec[props.rec], text: props.text }
  }

  render(){
    return (
      <span style={{color: this.state.icon[1]}}>
        <ModuleIcon awesome={this.state.icon[0]}></ModuleIcon>
        {this.state.text ? " " + this.state.icon[2] : ""}
      </span>
    )
  }
}

export default ModuleRecommendationIcon;