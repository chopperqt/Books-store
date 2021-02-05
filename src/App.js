import React , {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
//actions 
import LoadDataActions from './redux/Posts/actions';
import actions from './redux/Books/actions';
import actionsUsers from './redux/Users/actions';
import actionsAuthors from './redux/Authors/actions';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
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
  BookProfile,
  CartsItems,
  AuthorsItems,
  AuthorProfile,
  WrapperColor,
  PriceItem
} from './components/'


const App = () => {
  const [inputText, setInputText] = useState('');
  const posts = useSelector(state => state.posts.posts);
  const books = useSelector(state => state.books.booksItems)
  const booksStore = useSelector(state => state.books.booksItems);
  const limit = useSelector(state => state.books.limit);
  const searching = useSelector(state => state.books.searching);
  const isLoadBook = useSelector(state => state.books.isLoad);
  const cart = useSelector(state => state.cart.cart)

  const dispatch = useDispatch();
  const {
    loadFromDataPosts,
    addItemToData,
  } = LoadDataActions;

  const {
    actionMoreBooksData,
    actionGetBooks
  } = actions

  const {
    actionsGetUsers,
    actionsGetUsersError
  } = actionsUsers;
  
  const {
    actionsGetAuthors
  } = actionsAuthors;

  useEffect(() => {
    dispatch(loadFromDataPosts())
    fetchUsers()
    fetchBooks()
    fetchAuthors()
  }, [])
  
  function fetchBooks() {
    axios.get('https://api.allorigins.win/raw?url=http://test.zrkcompany.ru/books.json')
    .then(response => {
      dispatch(actionGetBooks(response.data))
    })
    .catch(function (error) {
      console.log(error)
    })
  }
  function fetchUsers() {
    axios.get('https://api.allorigins.win/raw?url=http://test.zrkcompany.ru/users.json')
    .then(response => {
      dispatch(actionsGetUsers(response.data))
    })
    .catch(function (error) {
      dispatch(actionsGetUsersError(error))
    })
  };
  function fetchAuthors() {
    axios.get("https://api.allorigins.win/raw?url=http://test.zrkcompany.ru/authors.json")
    .then(response => {
      dispatch(actionsGetAuthors(response.data))
    })
    .catch(function(error) {
      console.log(error)
    })
  }



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
        <Header cart={cart} />
        <Dashboard />
        <Wrapper>
          <Switch>
            <Route path="/books">
              <WrapperColor>
                <nav aria-label="breadcrumb" className="p-4 pb-0">
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                        <li className="breadcrumb-item active" aria-current="page">Books</li>
                    </ol>
                </nav>
                
                  <BooksItems data={posts} />
                  {searching ? null : <div className="col-md-12 d-flex justify-content-md-center mt-4">
                    {(limit >= booksStore.length) ? null : <button onClick={loadMoreBooks} className="btn btn-primary">Load more</button>}
                  </div>}
                </WrapperColor>
            </Route>
            <Route path="/book/:id" exact>
              <WrapperColor>
                <BookProfile />
              </WrapperColor>
            </Route>
            <Route path="/author/:id">
              <AuthorProfile />
            </Route>
            <Route path="/cart">
              <WrapperColor>
                <nav aria-label="breadcrumb" className="p-4 pb-0">
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                        <li className="breadcrumb-item active" aria-current="page">Cart</li>
                    </ol>
                </nav>
                <CartsItems />
              </WrapperColor>
              <WrapperColor>
                <PriceItem data={cart} />
              </WrapperColor>
            </Route>
            <Route path="/authors">
              <WrapperColor>
                <nav aria-label="breadcrumb" className="p-4 pb-0">
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                        <li className="breadcrumb-item active" aria-current="page">Authors</li>
                    </ol>
                </nav>
                <AuthorsItems />
              </WrapperColor>
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