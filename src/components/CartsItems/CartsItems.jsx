import React, {Suspense, lazy, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NavLink} from 'react-router-dom';
import actionsMenu from '../../redux/Menu/actions';
import {
  Loader
} from '../../components';

const BookItem = React.lazy(() => import ('../../components/BookItem'));
const CartItem = React.lazy(() => import ('../../components/CartItem'));
const SearchItem = React.lazy(() => import ('../../components/SearchItem'));



const {actionDasboardOpen} = actionsMenu;

const CartsItems = ({selected, unSelected}) => {
  const dispatch = useDispatch();

  const limit = useSelector(state => state.books.limit);

  const cartStore = useSelector(state => state.cart.cart);

  let books = cartStore.slice(0, limit);

  useEffect(() => {
    dispatch(actionDasboardOpen(0));
  }, [dispatch])

  return (
    <div
      className="col-md-12 col-sm-12-col-lg-12 ml-auto mr-3" style={{padding: '20px'}}>
      <Suspense fallback={<Loader />}>
        <div className="col-md-12 col-lg-12 col-sm-12 d-flex align-items-center" style={{borderBottom: '1px solid #ced4da', padding: '5px'}}>
          <p className="text-center text-muted" style={{width: '10%'}}></p>
          <p className="text-center text-muted" style={{width: '10%'}}></p>
          <p className="w-25 text-center text-muted" style={{fontSize: '12px'}}>Название</p>
          <p className="w-25 text-center text-muted" style={{fontSize: '12px'}}>Год</p>
          <p className="w-25 text-center text-muted" style={{fontSize: '12px'}}>Страниц</p>
          <p className="w-25 text-center text-muted" style={{fontSize: '12px'}}>Рейтинг</p>
          <p className="w-25 text-center text-muted" style={{fontSize: '12px'}}>Возрастное огра-ие</p>
          <p className="w-25 text-center text-muted" style={{fontSize: '12px'}}>Цена</p>
          <p className="w-25 text-center text-muted" style={{fontSize: '12px'}}>Цена со %</p>
          <p className="w-25 text-center text-muted" style={{fontSize: '12px'}}>Кол-во книг</p>
          <p className="w-25 text-center text-muted" style={{fontSize: '12px'}}>Кол-во</p>
          <div style={{width: '5%'}}></div>
        </div>
        {cartStore.length
          ? cartStore.map(item => (<CartItem  selected={(id,price) => selected(id,price)} unSelected={(id,price) => unSelected(id,price)} data={item} key={item._id}/>))
          : <h1 className="w-100 text-center fs-3 text-muted mt-3">There is nothing in the basket</h1>
        }
      </Suspense>
    </div>
  );
}

export default CartsItems;