import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import * as serviceWorker from './serviceWorker';
import routes from './routes'; // 추가
import { matchPath } from 'react-router'; // 추가
import 'styles/base.scss';

const render = async () => {
  if(process.env.NODE_ENV === 'development') {
    // 개발 모드에서는 바로 렌더링을 한다.
    return ReactDOM.render(<Root />, document.getElementById('root'));
  }

  // 프로덕션 모드에서는 일치하는 라우트를 찾아 미리 불러온 후 렌더링을 한다.
  const getComponents = [];
  const { pathname } = window.location;

  routes.forEach(
    route => {
      //일치하는 라우트를 찾고, getComponent를 호출하여 getComponents에 넣는다.
      const match = matchPath(pathname, route);
      if(!match) return;
      const { getComponent } = route.component;
      if(!getComponent) return;
      getComponents.push(getComponent());
    }
  );
  // getComponents가 끝날 때까지 기다린다.
  await Promise.all(getComponents);
  
  // render가 아닌 hydrate를 사용한다.
  // hybrate는 서버사이드 렌더링된 HTML 마크업을 그대로 유지하면서 이벤트만 등록해 준다.
  // 따라서 초기 렌더링 성능이 더욱 개선된다.
  ReactDOM.hydrate(<Root />, document.getElementById('root'));
}

render(); //render 호출
serviceWorker.unregister(); //register(); 로 변경하면 켜진다.

