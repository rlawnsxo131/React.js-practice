import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import App from './App';
import { hot } from 'react-hot-loader';

const Root = ({store}) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" component={App} />
      </BrowserRouter>
    </Provider>
  );
}

export default hot(module)(Root);
