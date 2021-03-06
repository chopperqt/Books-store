import './style.css';
import actionsCart from '../../redux/Cart/actions';
import {NavLink} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Toast as ToastComponent
} from 'reactstrap'
import {
  Toast
} from '../../components'

const BookItem = ({data}) => {
  const dispath = useDispatch();
  const cart = useSelector(state => state.cart.cart);
  const cartSelected = useSelector(state => state.cart.cartSelected);
  const [text,setText] = useState(true)
  const [color,setColor] = useState(true);
  const [view, setView] = useState(false);
  const [textInfo, setTextInfo] = useState(false);

 

  const {
    actionAddBookToCart, 
    actionRemoveBookFromCart,
    actionAddSelected,
    actionRemoveSelected
  } = actionsCart;

  const toggleToast = () => {setView(!view)}

  function actionBtn() {
    if (cart.filter(item => item._id === data._id).length === 0) {
      dispath(actionAddBookToCart(data))
      dispath(actionAddSelected(data._id, data.book_price))
      setTextInfo(true)
    } else {
      if (cartSelected.filter(item => item === data._id).length !== 0) {
        setTextInfo(false)
        dispath(actionRemoveSelected(data._id, data.book_price))
      }
      dispath(actionRemoveBookFromCart(data._id))
    }
    toggleToast()


    setColor(prev => !prev);
    setText(prev => !prev);

    setTimeout(() => setView(false),2000)
  }
  useEffect(() => {
    const filterCart = cart.filter(item => item._id === data._id);

    if (filterCart.length !== 0) {
      setColor(prev => !prev);
      setText(prev => !prev);
    }
  }, [])

  useEffect(() => {
    const filterCart = cart.filter(item => item._id === data._id);

    if (filterCart.length !== 0) {
      setColor(false);
      setText(false);
    }
  },[cart])

  return (
    <div className="col mt-3" style={{width: '250px'}}>
      <div className="card card__item w-100">
        <NavLink to={`/book/${data._id}`}>
          <img
            src={data.book_picture}
            className="card-img-top p-1"
            alt="Some image"/>
        </NavLink>
        <div className="card-body card__item__info d-flex flex-column justify-content-between  p-1">
          <div>
            <h4 className="mb-0  fs-6 mb-1">{data.book_name} {data.book_bestseller ? <i className="bi bi-award text-warning"></i> : null}</h4>
            <NavLink className="text-muted fs-6 justify-content-start" to="/author/2312312313">
              {data.book_authors.length !== 0 ? data.book_authors[0].fullname : null}
            </NavLink>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <p className='text-muted mb-0'>{data.book_price} $</p>
            <button onClick={actionBtn} className={color ? "card__btn__info text-success ms-0 fs-5" : "card__btn__info text-danger ms-0 fs-5"}>
              {text ? <i className="bi bi-plus-square"></i> : <i className="bi bi-dash-square"></i>}
            </button>
          </div>
        </div>
      </div>
      {/* <Toast view={view} viewButton={toggleToast} /> */}
      <div className="position-fixed bottom-0 end-0 p-3" style={{zIndex: "5"}}>
            <ToastComponent isOpen={view}>
            <div class="toast-header">
                <i className="bi bi-info-circle fs-6"></i>
                <strong class="me-auto ms-2">Info helper</strong>
                <button type="button" onClick={toggleToast} class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
              {textInfo ? <p>You have successfully <span className="text text-success">added</span> the book to your cart.</p> : <p>You have successfully <span className="text text-danger">removed</span> the book to your cart.</p>}
            </div>
            </ToastComponent>
        </div>
    </div>

  );
}

export default BookItem;