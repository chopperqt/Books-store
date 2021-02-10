import './style.css';
import axios from 'axios'
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink, Link} from 'react-router-dom';
import actionsBooks from '../../redux/Books/actions';
import actionsUsers from '../../redux/Users/actions';
import actionsCart from '../../redux/Cart/actions';
import actionsMenu from '../../redux/Menu/actions';
import React, {useEffect, useState} from 'react';


import {
  CommentItem,
  Loader,
  WrapperColor
} from '../../components';

import _ from 'lodash'
import {
  Button,
  Tooltip
} from 'reactstrap';

const BookProfile = ({
  cart,
  authors
}) => {
  const dispatch = useDispatch();

  //stors
  const books = useSelector(state => state.books.booksItems);
  const isLoad = useSelector(state => state.books.isLoad);
  //useState
  const [areaTextLength, setAreaTextLength] = useState(0);
  const [user,setUser] = useState(true);
  const [bookComments, setBookComments] = useState([]);
  const [genresArray, setGenresArray] = useState([]);
  const [commentValue,setCommentValue] = useState('');
  const [cartFilter, setCartFilter] = useState([]);
  const [color, setColor] = useState(true);
  const [text, setText] = useState(true);
  const [tooltipOpen, setTooltionOpen] = useState(false);
  const [tooltopTwoOpen, setTooltipTwoOpen] = useState(false);
  const [authrosArray, setAuthorsArray] = useState([]);


  const {id} = useParams();
  
  const {
    actionSearchBookData, 
    actionSendBookComment, 
    actionGetBooks,
    actionGetSimilarBook
  } = actionsBooks;

  const {
    actionAddBookToCart,
    actionRemoveBookFromCart,
  } = actionsCart

  const {
    actionDasboardOpen
  } = actionsMenu
  
  const {actionsGetUsers} = actionsUsers;
  const [book, setBook] = useState([]);

  //fetch function
  function fetchBooks() {
      axios
          .get('https://api.allorigins.win/raw?url=http://test.zrkcompany.ru/books.json')
          .then(response => {
              dispatch(actionGetBooks(response.data))
          })
          .catch(function (error) {
              console.log(error)
          })
    }
  useEffect(() => {
      if (!isLoad) {
        fetchBooks()
      }else {
        console.log('ID your book: ',id)
        setBook(books.filter(item => item._id === id))
      }
  }, [isLoad,id])

  useEffect(() => {
    dispatch(actionDasboardOpen(2));
  }, [dispatch])

  useEffect(() => {
      setBook(books.filter(item => item._id === id));
  }, [isLoad])

  useEffect(() => {
    setBook(books.filter(item => item._id === id))
  }, [commentValue])

  useEffect(() => {
    if (cart.filter(item => item._id === id).length !== 0) {
      setColor(prev => !prev);
      setText(prev => !prev);
    }
  }, [isLoad])


  useEffect(() => {
    setAuthorsArray([]);
    if (book.length !== 0) {
      _.forEach(authors, author => {
        let findCartItem = _.find(book[0].book_authors, bookItem => author._id === bookItem);
        if (findCartItem) {
          setAuthorsArray(prev => [author,...prev])
        }
      })
    }
    dispatch(actionGetSimilarBook(book[0]))
  }, [book,authors]);

  const tooltipToggle = () => setTooltionOpen(!tooltipOpen);
  const tooltopTwoToggle = () => setTooltipTwoOpen(!tooltopTwoOpen);

  function actionBtn() {
    if (color) {
      dispatch(actionAddBookToCart(book[0]))
    } else {
      dispatch(actionRemoveBookFromCart(id))
    }

    setColor(prev => !prev);
    setText(prev => !prev);
  }

  function sendComment() {
      console.log('work')
      let book_id = book[0]._id;
      let user_id = '600ffbc6d55857f4929aac6c';
      let data = {
          book_id: book_id,
          user_id: user,
          comment: commentValue
      }
      if (areaTextLength) {
          if(areaTextLength <= 500) {
            dispatch(actionSendBookComment(data))
          }
      }
      setCommentValue('');
      setAreaTextLength(0);
  }


  if (book.length !== 0) {
      return (
        <div>
        <WrapperColor>
          <div className="col-md-12 p-5">
              <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                          <NavLink to="/">Home</NavLink>
                      </li>
                      <li className="breadcrumb-item">
                          <NavLink to="/books">Books</NavLink>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">{book[0].book_name}</li>
                  </ol>
              </nav>
              <div className="col-md-12 d-md-flex d-lx-flex">
                  <div className="col-md-4 col-lg-4 col-sm-12">
                      <img
                          src={book[0].book_picture}
                          alt={book[0].book_name}
                          style={{
                          width: '100%'
                      }}/>
                      <div className="col-md-12 col-sm-12 col-lg-12 d-flex">
                        <div className="col-sm-6 col-lg-6 col-md-6">
                          <Button onClick={actionBtn} className={!color ? "btn btn-danger mt-2 w-100 btn-sm" : "btn btn-success mt-2 w-100 btn-sm" }>
                            {text ? "Add to cart" : "Remove from cart"}
                          </Button>
                        </div>
                        <div className="col-sm-6 col-lg-6 col-md-6 d-flex align-items-center mt-2">
                          <p className="text-muted ps-4 mb-0" id={"Tooltip-"+book[0]._id}><i className="bi bi-people"></i> {book[0].book_sells}</p>
                          <Tooltip placement="bottom" isOpen={tooltipOpen} target={"Tooltip-"+book[0]._id} style={{background: "#198754"}}  toggle={tooltipToggle}>
                            <p className="mb-0" style={{color: "#fff"}}>Number of books sold</p>
                          </Tooltip>
                          <p className="text-muted ps-4 mb-0" id={"Tooltip-"+book[0].book_name}><i className="bi bi-book"></i> {book[0].book_books}</p>
                          <Tooltip placement="bottom" isOpen={tooltopTwoOpen} target={"Tooltip-"+book[0].book_name} style={{background: "#198754"}}  toggle={tooltopTwoToggle}>
                            <p className="mb-0" style={{color: "#fff"}}>Books in stock</p>
                          </Tooltip>
                        </div>
                      </div>
                      
                  </div>
                  <div className="col-md-5 pr-5 col-lg-5 ms-3">
                      <h5 className="fs-6"><span className="text-muted">Name:</span> {book[0].book_name}</h5>
                      <h5 className="fs-6"><span className="text-muted">Pages:</span> {book[0].book_pages}</h5>
                      <h5 className="fs-6"><span className="text-muted">Author(s): </span> {authrosArray.length !== 0 ? authrosArray.map(item => <span>{item.author_firstname} {item.author_lastname}</span>) : "Not specified"}</h5>
                      <h5 className="fs-6"><span className="text-muted">Genres: </span></h5>
                      <h5 className="fs-6"><span className="text-muted">Age limit:</span> {book[0].book_age_limit}</h5>
                      <h5 className="fs-6"><span className="text-muted">Bestsellers:</span> {book[0].book_bestseller
                              ? 'Yes'
                              : 'No'}</h5>
                      <h5 className="fs-6"><span className="text-muted">Rating:</span> {book[0].book_rating} / 5</h5>
                      <h5 className="fs-6"><span className="text-muted">Price: </span>
                          <span className="text-primary">{book[0].book_price}$</span>
                      </h5>
                      <h5 className="fs-6"><span className="text-muted">Description: </span>{book[0].book_description}</h5>
                  </div>
              </div>
              
              
          </div>
        </WrapperColor>
        <div className="col-md-12 col-lg-12 col-sm-12 bookProfileGrid">
          <div className="col-md-6 col-sm-6 col-lg-6 w-100">
            <WrapperColor>
                <div className="col-md-12 col-sm-12 col-lg-12 p-5 mt-4">
                    <h5>Similar Books:</h5>
                </div>
            </WrapperColor>
          </div>
          <div className="col-md-6 col-sm-6 col-lg-6 w-100" style={{marginRight: '10px'}}>
            <WrapperColor>
            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 mt-4 p-5 ms-auto pb-0">
              <h5>Add comment:</h5>
                <div className="form-floating mt-1">
                    <textarea
                        className="form-control"
                        value={commentValue}
                        onChange={e => {
                        setAreaTextLength(e.target.value.length);
                        setCommentValue(e.target.value)
                        
                    }}
                        placeholder="Leave a comment here"
                        id="floatingTextarea2"
                        style={{
                        height: '100px',
                        resize: 'none'
                    }}></textarea>
                    <label for="floatingTextarea2">Add your comments</label>
                </div>
                <div className="col-md-12 d-flex justify-content-end align-items-baseline">
                  <p className="text-muted" style={{fontSize: '14px'}}>{areaTextLength} / 500</p>
                  <button onClick={sendComment} className="btn btn-sm btn-primary d-flex mt-2 ms-2">Send</button>
                </div>
              </div>
            <div className="col-md-12 col-lg-12 p-5 pt-0">
                  <h5>
                      <i className="bi bi-chat me-2 comments_leng">
                          <span>{book[0].book_comments.length}</span>
                      </i>Comments:</h5>
                  {book[0].book_comments.length !== 0
                      ? book[0].book_comments.map(item => (<CommentItem key={item._id} data={item}/>))
                      : <h5 className="text-muted">There are no comments. Be the first!</h5>}
              </div>
            </WrapperColor>
          </div>
          
        </div>
        </div>
      );
  } else {
      return (<Loader/>)
  }
}
export default BookProfile;