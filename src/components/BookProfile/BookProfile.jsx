import './style.css';
import axios from 'axios'
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink, Link} from 'react-router-dom';
import actionsBooks from '../../redux/Books/actions';
import actionsUsers from '../../redux/Users/actions';
import actionsCart from '../../redux/Cart/actions';
import actionsMenu from '../../redux/Menu/actions';
import React, {useEffect, useState, useMemo} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {getAllBooks, getOneBook} from '../../api/fetchBooks';

import {
  CommentItem,
  Loader,
  SimilarBook,
  WrapperColor
} from '../../components';

import _, { filter } from 'lodash'
import {
  Button,
  Tooltip,
} from 'reactstrap';

const BookProfile = ({
  cart,
  authors
}) => {

  const dispatch = useDispatch();

  //stors
  const books = useSelector(state => state.books.booksItems);
  const oneBook = useSelector(state => state.books.bookItem);
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
  const [dataSimilarBook, setDataSimilarBook] = useState([]);
  //tooltips
  const [tooltipOpen, setTooltionOpen] = useState(false);
  const [tooltipTwoOpen, setTooltipTwoOpen] = useState(false);
  const [tooltipRatingOpen,setTooltipRatingOpen] = useState(false)

  const [authrosArray, setAuthorsArray] = useState([]);
  const [itemSwap, setItemSwap] = useState(0);
  const [fakeLoader, setFakeLoader] = useState(false);
  const [countStars, setCountStars] = useState(5);

  //rating
  const [fixedRating, setFixedRating] = useState(false);
  const [firstStarFill, setFirstStarFill] = useState("bi bi-star")
  const [twoStarFill, setTwoStarFill] = useState("bi bi-star")
  const [threeStarFill, setThreeStarFill] = useState("bi bi-star")
  const [fourStarFill, setFourStarFill] = useState("bi bi-star")
  const [fiveStarFill, setFiveStarFill] = useState("bi bi-star")

  //genres
  const [arrayGanres, setArrayGenres] = useState([]);

  const {id} = useParams();
  
  const {
    actionSearchBookData, 
    actionSendBookComment, 
    actionGetBooks,
    actionGetSimilarBook,
    actionGetBook,
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

  useEffect(() => {
    dispatch(actionDasboardOpen(0));
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

  // useEffect(() => {
  //   setAuthorsArray([]);
  //   if (book.length !== 0) {
  //     _.forEach(authors, author => {
  //       let findCartItem = _.find(book[0].book_authors, bookItem => author._id === bookItem);
  //       if (findCartItem) {
  //         setAuthorsArray(prev => [author,...prev])
  //       }
  //     })

  //     setCountStars(prev => prev - book[0].book_rating)
  //   }
  //   dispatch(actionGetSimilarBook(book[0]))
  // }, [book,authors]);


  
  useEffect(() => {
    dispatch(actionGetBook([]))
    getOneBook(`http://localhost:8181/books/${id}`,dispatch);
  }, [])

  //tooltips
  const tooltipToggle = () => setTooltionOpen(!tooltipOpen);
  const tooltipTwoToggle = () => setTooltipTwoOpen(!tooltipTwoOpen);
  const tooltipRatingToggle = () => setTooltipRatingOpen(!tooltipRatingOpen)

  //rating
  const onMouseOverRating = (e) => {
    if (!fixedRating) {
      switch (e.target.id) {
        case "star-one":
          setFirstStarFill("bi bi-star-fill gold")
          break;
        case "star-two":
          setFirstStarFill("bi bi-star-fill gold")
          setTwoStarFill("bi bi-star-fill gold")
          break;
        case "star-three":
          setFirstStarFill("bi bi-star-fill gold")
          setTwoStarFill("bi bi-star-fill gold")
          setThreeStarFill("bi bi-star-fill gold")
          break;
        case "star-four":
          setFirstStarFill("bi bi-star-fill gold")
          setTwoStarFill("bi bi-star-fill gold")
          setThreeStarFill("bi bi-star-fill gold")
          setFourStarFill("bi bi-star-fill gold")
          break;
        case "star-five":
          setFirstStarFill("bi bi-star-fill gold")
          setTwoStarFill("bi bi-star-fill gold")
          setThreeStarFill("bi bi-star-fill gold")
          setFourStarFill("bi bi-star-fill gold")
          setFiveStarFill("bi bi-star-fill gold")
          break;
        default:
          break;
      }
    }
  }
  const omMouseOutRating = (e) => {
    if (!fixedRating) {
      switch (e.target.id) {
        case "star-one":
          setFirstStarFill("bi bi-star")
          break;
        case "star-two":
          setFirstStarFill("bi bi-star")
          setTwoStarFill("bi bi-star")
          break;
        case "star-three":
          setFirstStarFill("bi bi-star")
          setTwoStarFill("bi bi-star")
          setThreeStarFill("bi bi-star")
          break;
        case "star-four":
          setFirstStarFill("bi bi-star")
          setTwoStarFill("bi bi-star")
          setThreeStarFill("bi bi-star")
          setFourStarFill("bi bi-star")
          break;
        case "star-five":
          setFirstStarFill("bi bi-star")
          setTwoStarFill("bi bi-star")
          setThreeStarFill("bi bi-star")
          setFourStarFill("bi bi-star")
          setFiveStarFill("bi bi-star")
          break;
        default:
          break;
      }
    } 
  }
  const fixRating = () => {
    setFixedRating(true);
  }

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

  const swapSelected = (e,number) => {
    let comments = document.querySelector(".under__actions__comments");
    let reviews = document.querySelector(".under__actions__reviews");


    //Selected element
    let p = document.querySelector("#selected");
    //Remove add attribute
    p.removeAttribute("id")
    //Add Selected to target
    e.target.id = "selected"

    setItemSwap(number)
  }

  if (oneBook.length !== 0) {
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
                      <li className="breadcrumb-item active" aria-current="page">{oneBook.book_name}</li>
                  </ol>
              </nav>
              <div className="col-md-12 d-md-flex d-lx-flex">
                  <div className="col-md-4 col-lg-4 col-sm-12" style={{maxWidth: '300px'}} >
                      <img
                          src={oneBook.book_picture}
                          alt={oneBook.book_name}
                          style={{
                          width: '300px',
                          height: '400px'
                      }}/>
                      <div className="col-md-12 col-sm-12 col-lg-12 d-flex">
                        <div className="col-sm-6 col-lg-6 col-md-6">
                          <Button onClick={actionBtn} className={!color ? "btn btn-danger mt-2 w-100 btn-sm" : "btn btn-success mt-2 w-100 btn-sm" }>
                            {text ? "Add to cart" : "Remove from cart"}
                          </Button>
                        </div>
                        <div className="col-sm-6 col-lg-6 col-md-6 d-flex align-items-center mt-2">
                          <p className="text-muted ps-4 mb-0" id={"Tooltip-"+oneBook._id}><i className="bi bi-people"></i> {oneBook.book_sells}</p>
                          <Tooltip arrowClassName={"tooltip-arrow"} placement="bottom" isOpen={tooltipOpen} target={"Tooltip-"+oneBook._id}  toggle={tooltipToggle}>
                            <p className="mb-0" style={{color: "#fff"}}>Number of books sold</p>
                          </Tooltip>
                          <p className="text-muted ps-4 mb-0" id={"Tooltipp-"+oneBook._id}><i className="bi bi-book"></i> {oneBook.book_books}</p>
                          <Tooltip arrowClassName={"tooltip-arrow"} placement="bottom" isOpen={tooltipTwoOpen} target={"Tooltipp-"+oneBook._id} toggle={tooltipTwoToggle}>
                            <p className="mb-0" style={{color: "#fff"}}>Books in stock</p>
                          </Tooltip>
                        </div>
                      </div>
                      
                  </div>
                  <div className="col-md-5 pr-5 col-lg-5 ms-lg-3 ms-md-3 ms-sm-0">
                    <h5 className="w-100" style={{borderBottom: '1px solid #ced4da'}}>Detailed information:</h5>
                    <h5 className="fs-6"><span className="text-muted">Name:</span> {oneBook.book_name}</h5>
                    <h5 className="fs-6"><span className="text-muted">Pages:</span> {oneBook.book_pages}</h5>
                    <h5 className="fs-6"><span className="text-muted">Author(s): </span> <NavLink to={"/author/"+oneBook.book_authors[0]._id}><span key={oneBook.book_authors[0]._id}>{oneBook.book_authors[0].fullname}</span></NavLink></h5>
                    <h5 className="fs-6"><span className="text-muted">Genres: </span>{oneBook.book_genres.map((item,index) => <NavLink style={{textDecoration: 'none'}} key={index} to={"/books/"+item.name}>{item.name}{(oneBook.book_genres.length <= index + 1) ? null : ", "} </NavLink>)}</h5>
                    <h5 className="fs-6"><span className="text-muted">Age limit:</span> {oneBook.book_age_limit}+</h5>
                    <h5 className="fs-6"><span className="text-muted">Bestsellers:</span> {oneBook.book_bestseller
                            ? 'Yes'
                            : 'No'}</h5>
                    <h5 id={"Tooltip--"+oneBook._id} className="fs-6" style={{width: "150px"}}><span className="text-muted">Rating: </span>
                      <i id="star-one" className={"star-one "+firstStarFill} onClick={fixRating} onMouseOver={(e) => onMouseOverRating(e)} onMouseOut={(e) => omMouseOutRating(e)}></i>
                      <i id="star-two" className={"star-two "+twoStarFill} onClick={fixRating} onMouseOver={(e) => onMouseOverRating(e)} onMouseOut={(e) => omMouseOutRating(e)}></i>
                      <i id="star-three" className={"star-three "+threeStarFill} onClick={fixRating} onMouseOver={(e) => onMouseOverRating(e)} onMouseOut={(e) => omMouseOutRating(e)}></i>
                      <i id="star-four" className={"star-four "+fourStarFill} onClick={fixRating} onMouseOver={(e) => onMouseOverRating(e)} onMouseOut={(e) => omMouseOutRating(e)}></i>
                      <i id="star-five" className={"star-five "+fiveStarFill} onClick={fixRating} onMouseOver={(e) => onMouseOverRating(e)} onMouseOut={(e) => omMouseOutRating(e)}></i>
                    </h5>
                    <Tooltip arrowClassName={"tooltip-arrow"}  placement="bottom" isOpen={tooltipRatingOpen} target={"Tooltip--"+oneBook._id}  toggle={tooltipRatingToggle}>
                      <div>
                        <p className="mb-0">LitRes: 44.5</p>
                        <p className="mb-0">OZON: 65/100</p>
                        <p className="mb-0">LiveLib: 43.8</p>
                      </div>
                    </Tooltip>
                    <h5 className="fs-6"><span className="text-muted">Price: </span>
                        <span className="text-primary">{oneBook.book_price}$</span>
                    </h5>
                    <h5 className="w-100" style={{borderBottom: '1px solid #ced4da'}}>Share book</h5>
                    <div className="">
                      <i className="bi bi-twitter " style={{fontSize: "20px"}}></i>
                      <i className="bi bi-twitch ms-2" style={{fontSize: "20px"}}></i>
                      <i className="bi bi-github ms-2" style={{fontSize: "20px"}}></i>
                      <i className="bi bi-rss ms-2" style={{fontSize: "20px"}}></i>
                    </div>
                  </div>
              </div>
              
              
          </div>
        </WrapperColor>
        <div className="col-md-12 col-lg-12 col-sm-12 bookProfileGrid">
          <div className="col-md-6 col-sm-6 col-lg-6 w-100">
            <WrapperColor>
              <div  className="col-md-12 col-sm-12 col-lg-12 p-5 mt-4">
                <h5>Description:</h5>
                <p>{oneBook.book_description}</p>
              </div>
            </WrapperColor>
            <WrapperColor>
                <div className="col-md-12 col-sm-12 col-lg-12 p-5 mt-4">
                    <h5>Similar Books:</h5>
                    <div className="col-md-12 col-sm-12 col-lg-12" style={{columnCount: '6', columnGap: '10px'}}>
                      {/* {dataSimilaroneBook.length !== 0 ? 
                        dataSimilaroneBook.map(item => (
                          <SimilarBook key={item._id} /> 
                        ))
                        : 
                        <Loader />
                      } */}
                    </div>
                    
                </div>
            </WrapperColor>
          </div>
          <div className="col-md-6 col-sm-6 col-lg-6 w-100" style={{marginRight: '10px'}}>
            <WrapperColor>
            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 mt-4 p-5 ms-auto">
              <h5>Comments & Reviews</h5>
              {/* menu */}
              <div className="col-md-12 col-sm-12 col-lg-12 under__menu">
                <div className="col-md-12 col-sm-12 col-lg-12 d-flex under__menu__active mb-3">
                  <p onClick={(e,number) => swapSelected(e,0)} style={{fontSize: "14px"}} className="comments__" id="selected">Comments <span className="text-muted">{oneBook.book_comments.length}</span></p>
                  <p onClick={(e,number) => swapSelected(e,1)} style={{fontSize: "14px"}} className="reviews__ ms-3">Reviews <span className="text-muted">0</span></p>
                </div>
              </div>
              <div className="col-dm-12 col-sm-12 col-lg-12 under__actions">
                {itemSwap === 0 ? (
                <div className="col-md-12 col-sm-12 col-lg-12 under__actions__comments">
                  <div className="form-floating mt-1">
                    <textarea 
                      className="form-control" 
                      value={commentValue} 
                      onChange={e => { setAreaTextLength(e.target.value.length); setCommentValue(e.target.value)}}
                      placeholder="Leave a comment here"
                      id="floatingTextarea2"
                      style={{height: '100px',resize: 'none'}}>
                    </textarea>
                    <label htmlFor="floatingTextarea2">Add your comments</label>
                  </div>
                  <div className="col-md-12 d-flex justify-content-end align-items-baseline">
                    <p className="text-muted" style={{fontSize: '14px'}}>{areaTextLength} / 500</p>
                    <button onClick={sendComment} className="btn btn-sm btn-primary d-flex mt-2 ms-2">Send</button>
                  </div>
                  <div className="col-md-12 col-lg-12">
                    <p className="fs-6"><i className="bi bi-chat me-1 comments_leng" style={{fontSize: "20px"}}><span>{}</span></i>Comments:</p>
                    {oneBook.book_comments.length !== 0
                      ? oneBook.book_comments.map(item => (<CommentItem key={item._id} data={item}/>))
                      : <h5 className="text-muted">There are no comments. Be the first!</h5>
                    }
                  </div>
                </div>
                ) :
                  <div className="col-md-12 col-sm-12 col-lg-12 under__actions__reviews">
                    { fakeLoader ? "Reviews" : <Loader height={100} />}
                  </div>
                }
              </div>
            </div>
            </WrapperColor>
          </div>
          
        </div>
        </div>
      );
  } else {
      return (
        <WrapperColor >
          <Loader height={'100vh'} />
        </WrapperColor>)
  }
}
export default BookProfile;