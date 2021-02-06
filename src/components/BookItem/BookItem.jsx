import './style.css';
import actionsCart from '../../redux/Cart/actions';
import {NavLink} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const BookItem = ({data}) => {
  const dispath = useDispatch();
  const cart = useSelector(state => state.cart.cart);
  const short = data.book_description.slice(0, 120);
  const [text,setText] = useState(true)
  const [color,setColor] = useState(true);

  const {actionAddBookToCart, actionRemoveBookFromCart} = actionsCart;

  function actionBtn(event) {

    if (color) {
      dispath(actionAddBookToCart(data))
    } else {
      dispath(actionRemoveBookFromCart(data._id))
    }

    setColor(prev => !prev);
    setText(prev => !prev);
  }

  useEffect(() => {
    let filterCart = cart.filter(item => item._id === data._id)

    if (filterCart.length) {
      setColor(prev => !prev);
      setText(prev => !prev);
    }
  }, [])

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
          <h5 className="text-muted mt-1 mb-1 fs-6">{data.book_price}$</h5>
          <h5 className="text-warning mt-1 mb-1 fs-6" >{data.book_bestseller ? "Bestseller" : null}</h5>
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