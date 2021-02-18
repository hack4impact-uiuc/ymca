// @flow

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';
import './css/index.css';
import { ProvideAuth } from './utils/use-auth';

const root = document.getElementById('root');

if (root !== null) {
  ReactDOM.render(
    <ProvideAuth>
      <App />
    </ProvideAuth>,
    root,
  );
}

serviceWorker.unregister();
