import React from 'react';
import {Provider} from 'react-redux';
import App from './App';
import store from './Store';

const RootApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default RootApp;
