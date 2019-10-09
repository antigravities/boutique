import React from 'react';

import { Col, Row, Container } from 'react-bootstrap';
import Link from 'next/link';
import ModuleRecommendationIcon from './RecommendationIcon';

class ModuleList extends React.Component {
  constructor(props){
    super(props);

    this.state = { listID: props.listID, list: props.list || null };
  }

  async componentDidMount(){
    this.setState({ list: await (await fetch("/static/generated/list/" + this.state.listID + ".json")).json(), ready: true});
  }
  
  render(){
    if( ! this.state.list ) return false;

    let apps = this.state.list.apps.slice(0,3).map(i => <ModuleListItem app={i} key={"app-" + i.id} />);

    return (
      <div>
        <hr />
        <h2><Link href={"/list/" + this.state.listID}><a>{this.state.list.title}</a></Link></h2>
        <h4>{this.state.list.description}</h4>
        <Container>
          <Row>
            {apps}
          </Row>
        </Container>
      </div>
    );
  }
}

class ModuleListItem extends React.Component {
  constructor(props){
    super(props);

    this.state = { app: props.app };
  }

  render(){
    let headerLink = (this.state.app.long ? <Link href={"/review/" + this.state.app.id}><a><ModuleRecommendationIcon rec={this.state.app.recommended}/> {this.state.app.title}</a></Link> : <span><ModuleRecommendationIcon rec={this.state.app.recommended}/> {this.state.app.title}</span>);

    return (
      <Col sm className="b-list-col">
        <img src={"https://steamcdn-a.akamaihd.net/steam/apps/" + this.state.app.id + "/header.jpg"} className="w-100" />
        <h3>{headerLink}</h3>
        <p>{this.state.app.short}</p>
      </Col>
    )
  }
}

export default ModuleList;