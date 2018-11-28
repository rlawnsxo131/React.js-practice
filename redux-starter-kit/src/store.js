import { createStore, applyMiddleware } from 'redux';
import modules from './modules';

import { createLogger } from 'redux-logger';
import penderMiddleware from 'redux-pender';

/* 로그 미들웨어를 만들 때 설정을 커스터마이징 할 수 있다.
   https://github.com/evgenyrodionov/redux-logger#options
*/

const logger = createLogger();

const store = createStore(modules, applyMiddleware(logger,penderMiddleware()));

export default store;



//사용하지 않으므로 주석처리
//import ReduxThunk from 'redux-thunk';
//import promiseMiddleware from 'redux-promise-middleware';

/*
redux-promise-middleware 사용시 설정
const pm = promiseMiddleware({
    promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'FAILURE']
});
*/