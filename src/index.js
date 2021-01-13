import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//Создание хранилища всех наших данных
import {createStore} from 'redux';
import { Provider } from 'react-redux';

const userStore = {
  users: [
    {
      name: 'ilya',
      surname: 'Tsvetkov',
      age: '21',
      bDate: '29.08.1999'
    },
    {
      name: 'Kolya',
      surname: 'Test',
      age: '21',
      bDate: '29.08.1999'
    }
  ]
}

function playlist(state = userStore,action) {
  if (action.type === 'ADD_TRACK') {
    return [
      ...state,
      action.payload
    ]
  }
  return state;
}

const store = createStore(playlist);


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
