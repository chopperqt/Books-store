import './style.css';
import actionsCart from '../../redux/Cart/actions';
import {NavLink} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const BookItem = ({data}) => {
  const dispath = useDispatch();
  const cart = useSelector(state => state.cart.cart);
  const cartSelected = useSelector(state => state.cart.cartSelected);
  const short = data.book_description.slice(0, 120);
  const [text,setText] = useState(true)
  const [color,setColor] = useState(true);

 

  const {
    actionAddBookToCart, 
    actionRemoveBookFromCart,
    actionAddSelected,
    actionRemoveSelected
  } = actionsCart;

  function actionBtn() {
    if (cart.filter(item => item._id === data._id).length === 0) {
      dispath(actionAddBookToCart(data))
      dispath(actionAddSelected(data._id, data.book_price))
    } else {
      if (cartSelected.filter(item => item === data._id).length !== 0) {
        dispath(actionRemoveSelected(data._id, data.book_price))
      }
      dispath(actionRemoveBookFromCart(data._id))
    }

    setColor(prev => !prev);
    setText(prev => !prev);
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
    <div className="col mt-3">
      <div className="card h-100 w-100">
        <NavLink to={`/book/${data._id}`}>
          <img
            src="http://placehold.it/400x300"
            className="card-img-top"
            alt="Some image"/>
        </NavLink>

        <div className="card-body">
          <div className="d-flex">
            <h5 className="text-muted mt-1 mb-1 fs-6">{data.book_price}$</h5>
            <h5 className="text-danger mt-1 mb-1 fs-6 ms-2" >{data.book_bestseller ? "Bestseller" : null}</h5>
          </div>
          <h5 className="card-title mt-1 mb-1 fs-5">{data.book_name}</h5>
          <div className="itemButtons ms-0 ps-0">
            <button
              onClick={actionBtn}
              className={color
              ? 'btn btn-success btn-sm ms-0'
              : 'btn btn-danger btn-sm ms-0'}>{text
                ? 'Add to cart'
                : 'Remove cart'}</button>
          </div>
        </div>
      </div>
    </div>

  );
}

export default BookItem;