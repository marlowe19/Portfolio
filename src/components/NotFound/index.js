import React, { PropTypes, Component } from 'react';

import './style.css';

export default class NotFound extends Component {
 
  render() {
    const { ...props } = this.props;
    return (
      <div className="Not Found" {...props}>
        <h1>
          404 <small>Not Found :(</small>
        </h1>
      </div>
    );
  }
}