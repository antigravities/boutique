import React from 'react';
import '../styles/short.css';

import { Link } from 'react-router-dom';
import ModuleRecommendationIcon from './RecommendationIcon';

class ModuleShort extends React.Component {
  constructor(props){
    super(props);
    
    this.state = { app: props.app, side: props.side }
  }

  render(){
    return (
      <div>
        <hr />
        
        <div>
          <img style={{float: this.props.side }} className="b-short" src={"https://steamcdn-a.akamaihd.net/steam/apps/" + this.state.app.id + "/header.jpg"} />
          <div style={{"text-align": this.props.side == "left" ? "right" : "left" }}>
            <h2>{ this.state.app.long ? <Link to={"/review/" + this.state.app.id}><ModuleRecommendationIcon rec={this.state.app.recommended} /> {this.state.app.title}</Link> : <span><ModuleRecommendationIcon rec={this.state.app.recommended} /> {this.state.app.title}</span> }</h2>
            <p>{ this.state.app.short }</p>
          </div>
        </div>
      </div>
    )
  }
}

export default ModuleShort;