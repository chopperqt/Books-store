import React, {Suspense, lazy, useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NavLink} from 'react-router-dom';
import actionsMenu from '../../redux/Menu/actions';
import {Loader} from '../../components';

const BookItem = React.lazy(() => import ('../../components/BookItem'));
const SearchItem = React.lazy(() => import ('../../components/SearchItem'));

const {
  actionDasboardOpen,
  actionSetHistoryType
} = actionsMenu

const BooksItems = ({data}) => {
  const [updateData, setUpdateData] = useState([]);
  const booksStore = useSelector(state => state.books.booksItems);
  const cartStore = useSelector(state => state.cart.cart);
  const limit = useSelector(state => state.books.limit);
  const searchBook = useSelector(state => state.books.searchBook);
  const dispatch = useDispatch();
  let books = booksStore.slice(0, limit);

  useEffect(() => {
    dispatch(actionDasboardOpen(1))
    dispatch(actionSetHistoryType(true))
  }, [dispatch])
  
  useEffect(() => {
    setUpdateData(data);
  }, [data,cartStore])
  // Если поиск = фолсе тогда мы выводим то что ничего не найдено Иначе мы
  // проверяем массив на то есть ли в нём элементы если они есть тогда мы их
  // выводим Иначе мы отображем все книги

  return (
    <div
      className="row row-cols-1 row-cols-md-1 g-3 row-cols-sm-1 row-cols-lg-1 row-cols-xl-1 ml-auto mr-1" style={{padding: '20px', display: 'flex',  justifyContent: 'center'}}>
      <Suspense fallback={<Loader />}>
      {updateData.length !== 0 ? data.map(item => (<BookItem key={item._id} data={item} />)): <Loader />}
      </Suspense>
    </div>

  );
}

export default BooksItems;