import './style.css';

const CartItem = ({data}) => {
    return (
        <div className="col mt-3">
            <div className="card h-100 w-100">
                <img src="http://placehold.it/400x300" className="card-item-top" alt="Some img"/>
                <div className="card-body">
                    <h5 className="card-title">{data.book_name}</h5>
                    <p className="card-text">{short}<a href="#">...red more</a></p>
                    <div className="itemButtons">
                        <NavLink to={`/book/${data._id}`} className="btn btn-primary bottom">Go somewhere</NavLink>
                        <button onClick={actionBtn} className={color ? 'btn btn-success' : 'btn btn-danger'}>{text ? 'Add to cart' : 'Remove cart'}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default CartItem;