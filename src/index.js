import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//Создание хранилища всех наших данных
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import {rootReducer} from './redux/rootReducer';


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const store = createStore(
  rootReducer, 
  composeEnhancers(applyMiddleware(thunk)),
  //applyMiddleware(thunk),
);


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
