import React , {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import LoadDataActions from './redux/Posts/actions';
import actions from './redux/Books/actions';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import {v4 as uuid} from 'uuid';

import './App.css';

import {
  Header,
  Dashboard,
  Wrapper,
  BooksList,
  BookItem,
  BooksItems,
  BookProfile
} from './components/'


const App = () => {
  const [inputText, setInputText] = useState('');

  const dispatch = useDispatch();
  const {
    loadFromDataPosts,
    addItemToData,
  } = LoadDataActions;
  const {
    actionMoreBooksData
  } = actions
  
  useEffect(() => {
    dispatch(loadFromDataPosts())
  }, [dispatch])
  const posts = useSelector(state => state.posts.posts);

  function handleInput(e) {
    setInputText(prev => prev = e.target.value)
  }
  function addDataItem() {
    dispatch(addItemToData({
      name: inputText,
      surname: 'test',
      age: '212',
      bDate: Date.now()
    }))
  }

  function loadMoreBooks() {
    dispatch(actionMoreBooksData())
  }

  return (
    <div className="App">
      <Router>
        <Header />
        <Dashboard />
        <Wrapper>
          <Switch>
            <Route path="/books">
              <BooksItems data={posts} />
              <div className="col-md-12 d-flex justify-content-md-center">
                <button onClick={loadMoreBooks} className="btn btn-primary">Загрузить ещё</button>
              </div>
            </Route>
            <Route path="/book/:id">
              <BookProfile />
            </Route>
            <Route path="/">
              <div>
               <input type="test" name="add" onChange={handleInput} />
                <button type="button" onClick={addDataItem}>Add</button>
              </div>
            </Route>
          </Switch>
        </Wrapper>
      </Router>
    </div>
  );
}
 
export default App;