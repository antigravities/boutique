import React from 'react';

import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ModuleIcon from './Icon';

class ModuleHeader extends React.Component {
  constructor(props){
    super(props);

    console.log(props);

    this.state = { meta: props.meta };
  }

  render(){
    if( ! this.state.meta ) return null;
    return (
      <div>
        <div className="text-center b-brand">
          <h2>{this.state.meta.name}</h2>
        </div>
        <hr />
        <Row>
          <Col><h5 className="text-center"><Link to="/"><ModuleIcon awesome="fa-home"></ModuleIcon> Home</Link></h5></Col>
          <Col><h5 className="text-center"><Link to="/list"><ModuleIcon awesome="fa-list"></ModuleIcon> Lists</Link></h5></Col>
          <Col><h5 className="text-center"><Link to="/recent"><ModuleIcon awesome="fa-clock"></ModuleIcon> Recent</Link></h5></Col>
        </Row>
        <hr />
      </div>
    );
  }
}

export default ModuleHeader;