import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {NavLink} from 'react-router-dom';
import actionsCart from '../../redux/Cart/actions';
import {Tooltip} from 'reactstrap';

import './style.css';

const SearchItem = ({
  data,
  cartStore
}) => {
  const cart = useSelector(state => state.cart.cart)
  const dispath = useDispatch();
  const short = data.book_description.slice(0,50);
  const [color, setColor] = useState(true);
  const [checkAddCart, setCheckAddCart] = useState(false);
  const [text, setText] = useState(true);
  const [tooltipOpen, setTooltionOpen] = useState(false);

  const {
    actionAddBookToCart,
    actionRemoveBookFromCart
  } = actionsCart;

  const tooltipToggle = () => setTooltionOpen(!tooltipOpen);

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

  useEffect(() => {

    setCheckAddCart(cartStore.filter(item => item._id === data._id));

    console.log(checkAddCart)
  }, [cartStore])

  return (
      <div className="col-md-12 col-sm-12 col-lg-12 mb-3 d-flex">
        <div className="col-md-2 col-sm-2 col-lg-2">
          <NavLink to={"/book/"+data._id}>
            <img src="http://placehold.it/400x300" className="w-100" style={{height: "70px"}} />
          </NavLink>
        </div>
        <div className="col-md-9 col-sm-9-col-lg-9 ps-2 d-flex">
          <div className="col-md-11 col-sm-11 col-lg-11">
            <NavLink to={"/book/"+data._id}>
              <p className="text mb-0" style={{fontSize: "15px"}}>{data.book_name}</p>
            </NavLink>
            <div className="d-flex">
              <p className="text mb-0" style={{fontSize: "12px"}}>{data.book_price}$</p>
              <p className="text mb-0 text-warning ms-2" style={{fontSize: "12px"}}>{data.book_bestseller ? "Bestseller" : null}</p>
            </div>
            <p className="text-muted mb-0" style={{fontSize: "12px"}}>{short}<NavLink to={"/book/"+data._id}>...read more</NavLink></p>
          </div>
          <div className="col-md-1 col-sm-1 col-lg-1 d-flex align-items-center">
            <p className="text text-success mb-0 ps-2" style={{fontSize: "10px"}} id={"Tooltip-"+data._id}><i className={checkAddCart.length !== 0 ? "bi bi-check2" : null} style={{fontSize: '20px'}}></i></p>
            <Tooltip placement="left" isOpen={tooltipOpen} target={"Tooltip-"+data._id} style={{background: "#198754"}}  toggle={tooltipToggle}>
              <p className="mb-0" style={{color: "#fff"}}>Already in the basket</p>
            </Tooltip>
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