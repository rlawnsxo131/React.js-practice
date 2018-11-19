import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import './index.css';
import * as serviceWorker from './serviceWorker';

//리덕스 관련 불러오기
import { createStore } from 'redux';
import reducers from './reducers';
import { Provider } from 'react-redux';

//스토어 생성
const store = createStore(reducers, window.devToolsExtension && window.devToolsExtension());

ReactDOM.render(
   <Provider store={store}> 
    <App />
   </Provider>,
   document.getElementById('root'));

serviceWorker.unregister();
