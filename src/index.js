import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import './static/scss/index.scss';
import store from './utility/createStore';
import initApp from './utility/initApp';

const start = () => {
  initApp();
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
};
start();
