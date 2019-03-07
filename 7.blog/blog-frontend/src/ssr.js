import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router';
import { Provider } from 'react-redux';
import configure from 'store/configure';
import routes from './routes';
import axios from 'axios';
import transit from 'transit-immutable-js';
import { Helmet } from 'react-helmet';

import App from 'components/App';

const render = async (ctx) => {
  const { url, origin } = ctx; // 요청에서 URL을 받아 온다.

  axios.defaults.baseURL = origin;

  // 요청이 들어올 때마다 새 스토어를 생성한다.
  const store = configure();

  const promises = [];
  //라우트 설정에 반복문을 돌려서 일치하는 라우트를 찾는다.
  routes.forEach(
    route => {
      const match = matchPath(url, route);
      if(!match) return; // 일치하지 않으면 무시한다.
      
      // match가 성공하면 해당 라우트가 가리키는 컴포넌트의 preload를 호출한다.
      // 그리고 파싱된 params를 preload 함수에 전달한다.
      const { component } = route;
      const { preload } = component;
      if(!preload) return; //preload가 없으면 무시한다.

      // preload를 사용하여 얻는 프로미스를 promises 배열에 등록한다.
      const { params } = match; // Route의 props로 받는 match와 동일한 객체이다.
      
      // preload를 사용하여 얻은 프로미스를 promises 배열에 등록한다.
      const promise = preload(store.dispatch, params);
      promises.push(promise);
    }
  );

  try {
    // 등록된 모든 프로미스를 기다린다.
    await Promise.all(promises);
  } catch(e) {
    console.error(e);
  }

  // context(staticContext) 값을 빈 객체로 설정한다.
  const context = {};

  // renderToString은 렌더링된 결과물을 문자열로 만들어 준다.
  // 서버에서는 BrowserRouter 대신에 StaticRouter를 사용한다.
  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={url} context={context}>
        <App/>
      </StaticRouter>
    </Provider>
  );
  
  // isNotFound 값이 true라면
  if(context.isNotFound) {
    ctx.status = 404; // HTTP 상태를 404로 설정해 준다.
  }
  const helmet = Helmet.renderStatic();

  const preloadedState = JSON.stringify(transit.toJSON(store.getState()))
                             .replace(/</g, '\\u003c');

  // 스토어와, 렌더링된 문자열 결과물을 반환한다.
  return {
    html,
    preloadedState,
    helmet
  }
}

export default render;
