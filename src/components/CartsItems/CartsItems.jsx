import React,{Suspense,lazy, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {NavLink} from 'react-router-dom';
import actionsMenu from '../../redux/Menu/actions';

const BookItem = React.lazy(() => import('../../components/BookItem'));
const SearchItem = React.lazy(() => import('../../components/SearchItem'));

const {
    actionDasboardOpen
} = actionsMenu;

const CartsItems = ({data}) => {
    const dispatch = useDispatch();

    const limit = useSelector(state => state.books.limit);

    const cartStore = useSelector(state => state.cart.cart);

    let books = cartStore.slice(0,limit);

    useEffect(() => {
        dispatch(actionDasboardOpen(2));
    }, [dispatch])

    return (
        <div className="row row-cols-1 row-cols-md-2 g-6 row-cols-sm-1 row-cols-lg-3 row-cols-xl-4 ml-auto mr-3">
            
            <Suspense fallback={<div>Загрузка...</div>}>
                {
                    cartStore.length ? cartStore.map(item => (<SearchItem data={item} key={item._id} />)) : <h1 className="w-100">There is nothing in the basket</h1>
                }
            </Suspense>
        </div>
    );
}
 
export default CartsItems;