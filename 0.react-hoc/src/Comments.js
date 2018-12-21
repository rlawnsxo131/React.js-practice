import React, { Component } from 'react';
import WithRequest from './withRequest';

class Comments extends Component {
  render() {
    const { data } = this.props;

    if (!data) return null;

    return (
      <div>
        {JSON.stringify(data)}
      </div>
    );
  }
}

export default WithRequest('https://jsonplaceholder.typicode.com/comments?postId=1')(Comments);
