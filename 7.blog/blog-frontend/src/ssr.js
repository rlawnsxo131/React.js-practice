import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import configure from 'store/configure';

import App from 'components/App';

const render = (ctx) => {
  const { url } = ctx; // 요청에서 URL을 받아 온다.

  // 요청이 들어올 때마다 새 스토어를 생성한다.
  const store = configure();

  // renderToString은 렌더링된 결과물을 문자열로 만들어 준다.
  // 서버에서는 BrowserRouter 대신에 StaticRouter를 사용한다.
  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={url}>
        <App/>
      </StaticRouter>
    </Provider>
  );

  return html;
}

export default render;
