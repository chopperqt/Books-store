import React, {Suspense, lazy, useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {NavLink} from 'react-router-dom';
import actionsMenu from '../../redux/Menu/actions';
import {
  Loader,
  Toast,
  LoaderBooks,
  Paginator,
  LoaderMoreBooks
} from '../../components';

const BookItem = React.lazy(() => import ('../../components/BookItem'));
const SearchItem = React.lazy(() => import ('../../components/SearchItem'));


const {
  actionDasboardOpen,
  actionSetHistoryType
} = actionsMenu

const BooksItems = ({data,clickPagination}) => {
  const [updateData, setUpdateData] = useState([]);
  const booksStore = useSelector(state => state.books.booksItems);

  //pagination
  const totalBooks = useSelector(state => state.books.totalBooks); //Кол-во книг;
  const [currentPage, setCurrentPage] = useState(1); //Страница которая сейчас;
  const countNextPage = Math.round(totalBooks / 7);
  const [skipPage, setSkipPage] = useState(0);

  const cartStore = useSelector(state => state.cart.cart);
  const limit = useSelector(state => state.books.limit);

  const searchBook = useSelector(state => state.books.searchBook);
  const [fakeLoading, setFakeLoadin] = useState(false); 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionDasboardOpen(1))
    dispatch(actionSetHistoryType(true))
  }, [dispatch])
  
  useEffect(() => {
    setUpdateData(data);
  }, [data,cartStore])

  const changePage = (numberPage,pageNow) => {
      let oldActive = document.querySelector('.activetwo');
      let nowActive = document.querySelector('#page-item-'+numberPage);
      let centerActive = document.querySelector('#page-item-4');
      let lastActive = document.querySelector('#page-item-7');

      if (oldActive !== nowActive) {
        oldActive.className = "page-item";
        nowActive.className = "page-item active activetwo";
      }

      if (numberPage === 7) { 
        lastActive.className="page-item"
        centerActive.className = " page-item active activetwo"
        if (skipPage < countNextPage) {
          setCurrentPage(pageNow);
          setSkipPage(prev => prev + 1);
        }
      }
      


      console.log(pageNow)

  }

  return (
    <div
      className="row row-cols-1 row-cols-md-1 g-3 row-cols-sm-1 row-cols-lg-1 row-cols-xl-1 ml-auto mr-1" style={{padding: '20px', display: 'flex'}}>
      <Suspense fallback={<LoaderBooks />}>
        {updateData.length ? data.map(item => (<BookItem key={item._id} data={item} />)): <LoaderBooks />}
      </Suspense>
      <LoaderMoreBooks />
      {/* <Paginator 
        totalBooks={totalBooks} 
        changePage={changePage} 
        currentPage={currentPage} 
        countNextPage={countNextPage} 
      /> Может быть кто нибудь я захочу сделать постраничную пагинацию но пока что нет но она должна быть связанна с редуксом на будущее точто что бы знать всегда после асинхронно перехода на какой странице пользователь*/}
    </div>

  );
}

export default BooksItems;