import React from 'react';
import useRequest from './hooks/useRequest';

const Post = () => {
  const [response, loading, error] = useRequest(
    'https://jsonplaceholder.typicode.com/posts/1'
  );

  if (loading) {
    return <div>로딩중..</div>;
  }

  if (error) {
    return <div>에러 발생!</div>;
  }

  /*
    컴포넌트가 가장 처음 마운트 되는 시점은, Request 가 시작되지 않았으므로
    loading 이 false 이면서 response 도 null 이기에
    response null 체킹 필요 
  */
  if (!response) return null;

  const { title, body } = response.data;

  return (
    <div>
      <h1>{title}</h1>
      <p>{body}</p>
    </div>
  );
};

export default Post;
