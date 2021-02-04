import './style.css';
import axios from 'axios'
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import actionsBooks from '../../redux/Books/actions';
import actionsUsers from '../../redux/Users/actions';
import React, {useEffect, useState} from 'react';
import {CommentItem} from '../../components';
import {Loader} from '../../components';

const BookProfile = ({}) => {
  const dispatch = useDispatch();

  //stors
  const books = useSelector(state => state.books.booksItems);
  const isLoad = useSelector(state => state.books.isLoad);
  //useState
  const [areaTextLength, setAreaTextLength] = useState(0);
  const [user,setUser] = useState(true);
  const [bookComments, setBookComments] = useState([])
  const [commentValue,setCommentValue] = useState('');
  const {id} = useParams();
  
  const {
    actionSearchBookData, 
    actionSendBookComment, 
    actionGetBooks
  } = actionsBooks;
  
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
        setBook(books.filter(item => item._id === id))
      }
  }, [])
  useEffect(() => {
      setBook(books.filter(item => item._id === id));
  }, [isLoad])
  useEffect(() => {
    setBook(books.filter(item => item._id === id))
  }, [commentValue])
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
          dispatch(actionSendBookComment(data))
      }
      setCommentValue('');
      setAreaTextLength(0);
  }
  if (book.length !== 0) {
      return (
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
                  <div className="col-md-6 col-lg-6 col-sm-12">
                      <img
                          src={book[0].book_picture}
                          alt={book[0].book_name}
                          style={{
                          width: '100%'
                      }}/>
                  </div>
                  <div className="col-md-6 pr-5 col-lg-6 ms-3">
                      <h5><span className="text-muted">Name:</span> {book[0].book_name}</h5>
                      <h5><span className="text-muted">Pages:</span> {book[0].book_pages}</h5>
                      <h5><span className="text-muted">Author(s): </span></h5>
                      <h5><span className="text-muted">Age limit:</span> {book[0].book_age_limit}</h5>
                      <h5><span className="text-muted">Bestsellers:</span> {book[0].book_bestsellers
                              ? 'Yes'
                              : 'No'}</h5>
                      <h5><span className="text-muted">Rating:</span> {book[0].book_rating} / 5</h5>
                      <h5><span className="text-muted">Price: </span>
                          <span className="text-primary">{book[0].book_price}$</span>
                      </h5>
                      <h5><span className="text-muted">Description: </span>{book[0].book_description}</h5>
                  </div>
              </div>
              <div className="col-md-12 mt-4">
                  <h2>Add comment:</h2>
                  <div className="form-floating mt-4">
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
                          height: '100px'
                      }}></textarea>
                      <label for="floatingTextarea2">Comments</label>
                      <label
                          style={{
                          left: '80px'
                      }}
                          htmlFor="floatingTextarea2">{areaTextLength}</label>
                  </div>
                  <div className="col-md-12 d-flex justify-content-end">
                      <button onClick={sendComment} className="btn btn-primary d-flex mt-2">Send</button>
                  </div>
              </div>
              <div className="col-md-12 col-lg-12 mt-4">
                  <h2>
                      <i className="bi bi-chat me-2 comments_leng">
                          <span>{book[0].book_comments.length}</span>
                      </i>Comments:</h2>
                  {book[0].book_comments.length !== 0
                      ? book[0].book_comments.map(item => (<CommentItem key={item._id} data={item}/>))
                      : <h5 className="text-muted">There are no comments. Be the first!</h5>}
              </div>
          </div>
      );
  } else {
      return (<Loader/>)
  }
}
export default BookProfile;