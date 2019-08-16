import React from 'react';
import { Link } from 'react-router-dom';

class PageNotFound extends React.Component {
  render(){
    return (
      <div>
        <h1>Oh no</h1>

        The page you requested could not be found. <Link to="/">Go home</Link>
      </div>
    )
  }
}

export default PageNotFound;