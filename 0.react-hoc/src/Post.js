import React, { Component } from 'react';
import withRequest from './withRequest';

class Post extends Component {
  render() {
    const { data } = this.props;
    
    if (!data) return null;

    return (
      <div>
        { JSON.stringify(data) }    
      </div>
    );
  }
}

export default withRequest('https://jsonplaceholder.typicode.com/posts/1')(Post);

/* 
혹은 이와같이 export default해도 된다.
const PostWithData = withRequest('https://jsonplaceholder.typicode.com/posts/1')(Post);
export default PostWithData;
*/

