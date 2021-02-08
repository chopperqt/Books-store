import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {NavLink} from 'react-router-dom';
import actionsCart from '../../redux/Cart/actions';


import './style.css';

const SearchItem = ({data}) => {
  const cart = useSelector(state => state.cart.cart)
  const dispath = useDispatch();
  const short = data.book_description.slice(0,50);
  const [color, setColor] = useState(true);
  const [text, setText] = useState(true);

  const {
    actionAddBookToCart,
    actionRemoveBookFromCart
  } = actionsCart;

  function actionBtn() {
    if (color) {
      dispath(actionAddBookToCart(data))
    }else {
      dispath(actionRemoveBookFromCart(data._id))
    }
    setColor(prev => !prev);
    setText(prev => !prev)
  }
  useEffect(() => {
    let filterCart = cart.filter(item => item._id === data._id);

    if (filterCart.length) {
      setColor(prev => !prev);
      setText(prev => !prev)
    }
  }, [])

  return (
      <div className="col-md-12 col-sm-12 col-lg-12 mb-3 d-flex">
        <div className="col-md-2 col-sm-2 col-lg-2">
          <img src="http://placehold.it/400x300" className="w-100" style={{height: "70px"}} />
        </div>
        <div className="col-md-9 col-sm-9-col-lg-9 ps-2 d-flex">
          <div className="col-md-11 col-sm-11 col-lg-11">
            <p className="text mb-0" style={{fontSize: "15px"}}>{data.book_name}</p>
            <div className="d-flex">
              <p className="text mb-0" style={{fontSize: "12px"}}>{data.book_price}$</p>
              <p className="text mb-0 text-warning ms-2" style={{fontSize: "12px"}}>{data.book_bestseller ? "Bestseller" : null}</p>
            </div>
            <p className="text-muted" style={{fontSize: "12px"}}>{short}<NavLink to={"/book/"+data._id}>...read more</NavLink></p>
          </div>
          <div className="col-md-1 col-sm-1 col-lg-1">
            <p style={{fontSize: "10px"}}>in</p>
          </div>
        </div>
          {/* <div className="card h-100 w-100">
              <img src="http://placehold.it/400x300" className="card-img-top" alt="Some image"/>
              <div className="card-body">
                <h5 className="card-title">{data.book_name}</h5>
                <p className="card-text">{short}<a href="#">...read more</a> </p>
                <div className="itemButtons">
                  <NavLink to={`/book/${data._id}`} className="btn btn-primary bottom">Go somewhere</NavLink>
                  <button onClick={actionBtn} className={color ? 'btn btn-success' : 'btn btn-danger'}>{text ? 'Add to cart' : 'Remove cart'}</button>
                </div>
              </div>
          </div> */}
      </div>
  );
}
 
export default SearchItem;