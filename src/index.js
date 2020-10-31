import './views/styles/styles.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import { initAuth } from 'src/state/auth';
import history from 'src/state/history';
import configureStore from 'src/state/store';
import registerServiceWorker from './utils/register-service-worker';
import App from './views/app';


const store = configureStore();
const rootElement = document.getElementById('root');


function render(Component) {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Component/>
        </div>
      </ConnectedRouter>
    </Provider>,
    rootElement
  );
}


if (module.hot) {
  module.hot.accept('./views/app', () => {
    render(require('./views/app').default);
  })
}


registerServiceWorker();


initAuth(store.dispatch)
  .then(() => render(App))
  .catch(error => console.error(error));
