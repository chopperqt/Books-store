import './style.css';
import actionsCart from '../../redux/Cart/actions';
import {NavLink} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const BookItem = ({data}) => {
    const dispath = useDispatch();
    const cart = useSelector(state => state.cart.cart);
    const short = data.book_description.slice(0,120);
    const [text, setText] = useState(true)
    const [color, setColor] = useState(true);

    const {
        actionAddBookToCart,
        actionRemoveBookFromCart
    } = actionsCart;

    function actionBtn(event) {

        if (color) {
            dispath(actionAddBookToCart(data))   
        }else {
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
    },[])

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
 
export default BookItem;