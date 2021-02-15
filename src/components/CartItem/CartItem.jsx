import React, {useState, useEffect} from 'react';
import './style.css';
import dataFormat from 'dateformat';
import {useDispatch, useSelector} from 'react-redux';


const CartItem = ({
    data,
    selected,
    unSelected
}) => {
    const dispatch = useDispatch();
    const cartSelected = useSelector(state => state.cart.cartSelected);

    const [check,setCheck] = useState(false);
    useEffect(() => {
        let item = document.querySelectorAll(".customCard__"+data._id)[0];
        item.style.boxShadow = "0px 0px 10px 0px rgb(34 60 80 / 20%)";

        let filterCartSelected = cartSelected.filter(sel => sel === data._id);

        if (filterCartSelected.length !== 0) {
            setCheck(true)
        }
    }, [])
    const checked = (e,id) => {
        let item = document.querySelectorAll(".customCard__"+id)[0];
        
        if (check) {
            setCheck(prev => !prev);
            item.style.boxShadow = "none"
            item.style.transition = ".4s";
            dispatch(unSelected(data._id,data.book_price))
        }else {
            setCheck(prev => !prev);
            item.style.boxShadow = "0px 0px 10px 0px rgb(34 60 80 / 20%)";
            item.style.transition = ".4s";
            dispatch(selected(data._id,data.book_price))
        }

        //item.style.boxShadow = "0px 0px 10px 0px rgb(34 60 80 / 20%)";
    }
    return (
        <div className="col-md-12 col-lg-12 col-sm-12 mt-3">
            <div className="col-lg-12 col-sm-12 col-md-12 d-flex">
                <div className={"col-md-12 col-sm-12 col-lg-12 d-flex align-items-center customCard customCard__"+data._id}>
                    <div style={{width: "10%"}} className="d-flex justify-content-center">
                        <input className="form-check-input mt-0" onChange={(e) => checked(e,data._id)} checked={check} type="checkbox"></input>
                    </div>
                    <div style={{width: '10%'}}>
                        <img src="http://placehold.it/400x300" className="w-100 h-5" alt="Some img"/>
                    </div>
                    <h5 className="w-25 text-center mb-0" style={{fontSize: '12px'}}>{data.book_name}</h5>
                    <h5 className="w-25 text-center mb-0" style={{fontSize: '12px'}}>{data.book_data.slice(0,10)}</h5>
                    <h5 className="w-25 text-center mb-0" style={{fontSize: '12px'}}>{data.book_pages}</h5>
                    <h5 className="w-25 text-center mb-0" style={{fontSize: '12px'}}>{data.book_rating}/5</h5>
                    <h5 className="w-25 text-center mb-0" style={{fontSize: '12px'}}>{data.book_age_limit}</h5>
                    <h5 className="w-25 text-center mb-0" style={{fontSize: '12px'}}>{data.book_price}$</h5>
                    <h5 className="w-25 text-center mb-0" style={{fontSize: '12px'}}>{data.book_price * (100 -data.book_discount) / 100}$ ({data.book_discount}%)</h5>
                    <h5 className="w-25 text-center mb-0" style={{fontSize: '12px'}}>{data.book_books}</h5>
                    <div className="w-25 d-flex align-items-center">
                        <i className="bi bi-dash w-25 text-center" style={{fontSize: '12px'}}></i>
                        <input className="w-50 text-center" style={{fontSize: '12px'}} value={1} disabled={true} />
                        <i className="bi bi-plus w-25 text-center" style={{fontSize: '12px'}}></i>
                    </div>
                    <div className="mb-0 d-flex align-items-center text-center" style={{width: '5%', borderLeft: "1px solid rgb(206, 212, 218)"}}>
                        <i className="bi bi-x w-100" style={{fontSize: '20px', lineHeight: '0'}}></i>
                    </div>
                    
                    <div className="">
                        {/* <NavLink to={`/book/${data._id}`} className="btn btn-primary bottom">Go somewhere</NavLink>
                        <button onClick={actionBtn} className={color ? 'btn btn-success' : 'btn btn-danger'}>{text ? 'Add to cart' : 'Remove cart'}</button> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default CartItem