import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {NavLink} from 'react-router-dom';
import actionsCart from '../../redux/Cart/actions';


import './style.css';

const SearchItem = ({data}) => {
  const cart = useSelector(state => state.cart.cart)
  const dispath = useDispatch();
  const short = data.book_description.slice(0,120);
  const [color, setColor] = useState(true);
  const [text, setText] = useState(true);

  const {
    actionAddBookToCart,
    actionRemoveBookFromCart
  } = actionsCart;

  function actionBtn() {
    if (color) {
      dispath(actionAddBookToCart(data._id))
    }else {
      dispath(actionRemoveBookFromCart(data._id))
    }
    setColor(prev => !prev);
    setText(prev => !prev)
  }
  useEffect(() => {
    let filterCart = cart.filter(item => item === data._id);

    if (filterCart.length) {
      setColor(prev => !prev);
      setText(prev => !prev)
    }
  }, [])

  return (
      <div className="col mt-3">
          <div className="card h-100 w-100">
              <img src="http://placehold.it/400x300" className="card-img-top" alt="Some image"/>
              <div className="card-body">
                <h5 className="card-title">{data.book_name}</h5>
                <p className="card-text">{short}<a href="#">...read more</a> </p>
                <div className="itemButtons">
                  <NavLink to={`/book/${data._id}`} className="btn btn-primary bottom">Go somewhere</NavLink>
                  <button onClick={actionBtn} className={color ? 'btn btn-success' : 'btn btn-danger'}>{text ? 'Add to cart' : 'Remove cart'}</button>
                </div>
              </div>
          </div>
      </div>
  );
}
 
export default SearchItem;