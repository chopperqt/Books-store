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
    },
    {
      name: 'Chopper',
      surname: 'XX',
      age: '10',
      bDate: '29.08.1909'
    }
  ]
}

const FETCH_DATA = 'FETCH_DATA';

function playlist(state = userStore,action) {

  switch (action.type) {
    case FETCH_DATA:
      fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(json => console.log(json))
      return [
        ...state,
        action.payload
      ]
    default:
      return state;
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
