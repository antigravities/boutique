import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../styles/carousel.css';

import { Link } from 'react-router-dom';
import ModuleRecommendationIcon from './RecommendationIcon';

class ModuleCarousel extends React.Component {
  constructor(props){
    super(props);

    let apps = [];
    const classes = [ "text-left", "text-right" ]

    for(let app in props.apps){
      let long = "";
      if( props.apps[app].long ) long=<Link to={"review/" + props.apps[app].id}>Read more...</Link>;

      apps.push(
        <Carousel.Item key={props.apps[app].id}>
          <img
            className="d-block w-100"
            src={props.apps[app].image[Math.floor(Math.random()*props.apps[app].image.length)]}
            alt={props.apps[app].name}
          />
          <Carousel.Caption className={classes[app%2] + " b-carousel-caption"}>
            <h3><ModuleRecommendationIcon rec={props.apps[app].recommended} /> {props.apps[app].title}</h3>
            <p>{props.apps[app].short} {long}</p>
          </Carousel.Caption>
        </Carousel.Item>
      );
    }

    this.state = {apps};
  }

  render(){
    console.log(this.state);
    
    return (
      <Carousel className="b-carousel">
        {this.state.apps}
      </Carousel>
    );
  }
}

export default ModuleCarousel;