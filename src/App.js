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
  PriceItem,
  Home
} from './components/'


const App = () => {
  const [inputText, setInputText] = useState('');
  const posts = useSelector(state => state.posts.posts);
  const books = useSelector(state => state.books.booksItems)
  const booksStore = useSelector(state => state.books.booksItems);
  const authorsStore = useSelector(state => state.authors.authors)
  const limit = useSelector(state => state.books.limit);
  const searching = useSelector(state => state.books.searching);
  const isLoadBook = useSelector(state => state.books.isLoad);
  const cart = useSelector(state => state.cart.cart);
  const [booksVault, setBooksVault] = useState([]);

  const searchBook = useSelector(state => state.books.searchBook);

  const dispatch = useDispatch();

  //actions
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

  useEffect(() => {
    setBooksVault(books)
  },[books])
  
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

  const changeBookFilter = (name) => {
    switch (name) {
      case 'bestseller':
        setBooksVault(booksVault.filter(item => item.book_bestseller === true));
        break;
      default:
        setBooksVault(books)
        break;
    }
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
  //console.log(books.filter(item => item.book_genres))
  return (
    <div className="App">
      <Router>
        <Header 
          cart={cart}
          searchBook={searchBook}
        />
        <Dashboard 
          changeBookFilter={changeBookFilter}
          bestsellersCount={books.filter(item => item.book_bestseller === true).length}  
          gearsCount={books.filter(item => item.book_genres[0] === "gear").length}
        />
        <Wrapper>
          <Switch>
            <Route path="/books/bestsellers/">
              <WrapperColor>
                <nav aria-label="breadcrumb" className="p-4 pb-0">
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                        <li className="breadcrumb-item active" aria-current="page"><NavLink to="/books">Books</NavLink></li>
                        <li className="breadcrumb-item active" aria-current="page">Bestsellers</li>
                    </ol>
                </nav>
                SomeText
              </WrapperColor>
            </Route>
            <Route path="/books">
              <WrapperColor>
                <nav aria-label="breadcrumb" className="p-4 pb-0">
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                        <li className="breadcrumb-item active" aria-current="page">Books</li>
                    </ol>
                </nav>
                <BooksItems data={booksVault} />
                {searching ? null : <div className="col-md-12 d-flex justify-content-md-center mt-4">
                  {(limit >= booksStore.length) ? null : <button onClick={loadMoreBooks} className="btn btn-sm btn-primary mb-4">Load more</button>}
                </div>}
              </WrapperColor>
            </Route>
            <Route path="/book/:id" exact>
                <BookProfile cart={cart} authors={authorsStore} />
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
                <Home />
            </Route>
          </Switch>
        </Wrapper>
      </Router>
    </div>
  );
}
 
export default App;