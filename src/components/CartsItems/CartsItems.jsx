import React,{Suspense,lazy} from 'react';
import { useSelector } from 'react-redux';
import {NavLink} from 'react-router-dom';
const BookItem = React.lazy(() => import('../../components/BookItem'));
const SearchItem = React.lazy(() => import('../../components/SearchItem'));



const CartsItems = ({data}) => {

    const limit = useSelector(state => state.books.limit);

    const cartStore = useSelector(state => state.cart.cart);

    let books = cartStore.slice(0,limit);


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