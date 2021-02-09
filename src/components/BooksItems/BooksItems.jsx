import React, {Suspense, lazy, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NavLink} from 'react-router-dom';
import actionsMenu from '../../redux/Menu/actions';
import {Loader} from '../../components';

const BookItem = React.lazy(() => import ('../../components/BookItem'));
const SearchItem = React.lazy(() => import ('../../components/SearchItem'));

const {actionDasboardOpen} = actionsMenu

const BooksItems = ({data}) => {

  const booksStore = useSelector(state => state.books.booksItems);
  const limit = useSelector(state => state.books.limit);
  const searchBook = useSelector(state => state.books.searchBook);
  const dispatch = useDispatch();
  let books = booksStore.slice(0, limit);

  useEffect(() => {
    dispatch(actionDasboardOpen(3))
  }, [dispatch])
  // Если поиск = фолсе тогда мы выводим то что ничего не найдено Иначе мы
  // проверяем массив на то есть ли в нём элементы если они есть тогда мы их
  // выводим Иначе мы отображем все книги

  return (
    <div
      className="row row-cols-1 row-cols-md-2 g-6 row-cols-sm-1 row-cols-lg-3 row-cols-xl-4 ml-auto mr-3" style={{padding: '20px'}}>
      <Suspense fallback={<Loader />}>
      {data.length !== 0 ? data.map(item => (<BookItem key={item._id} data={item} />)): <Loader />}
      </Suspense>
    </div>

  );
}

export default BooksItems;