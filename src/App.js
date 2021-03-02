import React , {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
//actions 
import LoadDataActions from './redux/Posts/actions';
import actions from './redux/Books/actions';
import actionsUsers from './redux/Users/actions';
import actionsAuthors from './redux/Authors/actions';
import actionsCart from './redux/Cart/actions';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  NavLink,
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
  Home,
  AddBook
} from './components/'


const App = () => {
  const [inputText, setInputText] = useState('');
  const posts = useSelector(state => state.posts.posts);
  const books = useSelector(state => state.books.booksItems)
  const priceStore = useSelector(state => state.cart.price);
  const booksStore = useSelector(state => state.books.booksItems);
  const authorsStore = useSelector(state => state.authors.authors)
  const limit = useSelector(state => state.books.limit);
  const searching = useSelector(state => state.books.searching);
  const isLoadBook = useSelector(state => state.books.isLoad);
  const cart = useSelector(state => state.cart.cart);
  const [booksVault, setBooksVault] = useState([]);

  const searchBook = useSelector(state => state.books.searchBook);

  const [stateBooks, setStateBooks] = useState([]);

  const dispatch = useDispatch();

  //actions
  const {
    actionAddSelected,
    actionRemoveSelected
  } = actionsCart;
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
    setBooksVault(books);
    setStateBooks(books);
  },[books]);
  
  useEffect(() => {
    setBooksVault(books)
  }, [cart])

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
  //console.log(books.filter(item => item.book_genres))
  return (
    <div className="App">
      <Router>
        <Header 
          cart={cart}
          searchBook={searchBook}
          priceStore={priceStore}
        />
        <Dashboard 
          bestsellersCount={books.filter(item => item.book_bestseller === true).length}  
          gearsCount={books.filter(item => item.book_genres[0] === "gear").length}
        />
        <Wrapper>
          <Switch>
            <Route path="/books/Bestseller">
              <WrapperColor>
                <nav aria-label="breadcrumb" className="p-4 pb-0 d-flex justify-content-between align-items-center">
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                        <li className="breadcrumb-item active" aria-current="page"><NavLink to="/books">Books</NavLink></li>
                        <li className="breadcrumb-item active" aria-current="page">Bestseller</li>
                    </ol>
                    <NavLink to="/book/add">
                      <button className="btn btn-outline-primary">
                        Add book
                      </button>
                    </NavLink>
                </nav>
                <BooksItems data={books.filter(item => item.book_bestseller === true)} />
              </WrapperColor>
            </Route>
            <Route path="/books/Gear">
              <WrapperColor>
              <nav aria-label="breadcrumb" className="p-4 pb-0">
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                        <li className="breadcrumb-item active" aria-current="page"><NavLink to="/books">Books</NavLink></li>
                        <li className="breadcrumb-item active" aria-current="page">Gear</li>
                    </ol>
                </nav>
                <BooksItems data={books.filter(item => item.book_genres.gear === true)} />
              </WrapperColor>
            </Route>
            <Route path="/books/Sport"  ex>
              <WrapperColor>
              <nav aria-label="breadcrumb" className="p-4 pb-0">
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                        <li className="breadcrumb-item active" aria-current="page"><NavLink to="/books">Books</NavLink></li>
                        <li className="breadcrumb-item active" aria-current="page">Sport</li>
                    </ol>
                </nav>
                <BooksItems data={books.filter(item => item.book_genres.sport === true)} />
              </WrapperColor>
            </Route>
            <Route path="/books/Travel" >
              <WrapperColor>
              <nav aria-label="breadcrumb" className="p-4 pb-0">
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                        <li className="breadcrumb-item active" aria-current="page"><NavLink to="/books">Books</NavLink></li>
                        <li className="breadcrumb-item active" aria-current="page">Travel</li>
                    </ol>
                </nav>
                <BooksItems data={stateBooks.filter(item => item.book_genres.travel === true)} />
              </WrapperColor>
            </Route>
            <Route path="/books/Cooking" >
              <WrapperColor>
              <nav aria-label="breadcrumb" className="p-4 pb-0">
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                        <li className="breadcrumb-item active" aria-current="page"><NavLink to="/books">Books</NavLink></li>
                        <li className="breadcrumb-item active" aria-current="page">Cooking</li>
                    </ol>
                </nav>
                <BooksItems data={books.filter(item => item.book_genres.cooking === true)} />
              </WrapperColor>
            </Route>
            <Route path="/books/Game" >
              <WrapperColor>
              <nav aria-label="breadcrumb" className="p-4 pb-0">
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                        <li className="breadcrumb-item active" aria-current="page"><NavLink to="/books">Books</NavLink></li>
                        <li className="breadcrumb-item active" aria-current="page">Game</li>
                    </ol>
                </nav>
                <BooksItems data={books.filter(item => item.book_genres.game === true)} />
              </WrapperColor>
            </Route>
            <Route path="/books/Love-Story" >
              <WrapperColor>
              <nav aria-label="breadcrumb" className="p-4 pb-0">
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                        <li className="breadcrumb-item active" aria-current="page"><NavLink to="/books">Books</NavLink></li>
                        <li className="breadcrumb-item active" aria-current="page">Love Story</li>
                    </ol>
                </nav>
                <BooksItems data={books.filter(item => item.book_genres.loveStory === true)} />
              </WrapperColor>
            </Route>
            <Route path="/books" component={() =>
              <WrapperColor>
                <nav aria-label="breadcrumb" className="p-4 pb-0">
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                        <li className="breadcrumb-item active" aria-current="page">Books</li>
                    </ol>
                </nav>
                <BooksItems data={booksVault} />
                {/* {searching ? null : <div className="col-md-12 d-flex justify-content-md-center mt-4">
                  {(limit >= booksStore.length) ? null : <button onClick={loadMoreBooks} className="btn btn-sm btn-primary mb-4">Load more</button>}
                </div>} */}
              </WrapperColor>
            }>
            </Route>           
            <Route path="/book/add">
              <AddBook />
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
                <CartsItems selected={actionAddSelected} unSelected={actionRemoveSelected} />
              </WrapperColor>
              <WrapperColor>
                <PriceItem data={priceStore} />
              </WrapperColor>
            </Route>
            <Route path="/home" redirect>
              <Redirect to="/" />
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