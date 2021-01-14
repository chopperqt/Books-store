import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//Создание хранилища всех наших данных
import {createStore, compose} from 'redux';
import { Provider } from 'react-redux';

import {rootReducer} from './redux/rootReducer';





const store = createStore(rootReducer, compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
