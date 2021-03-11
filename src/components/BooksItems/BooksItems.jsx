import React, {Suspense, lazy, useEffect, useState} from 'react';
import './style.css'
import {useSelector, useDispatch} from 'react-redux';
import {
  getMoreBook
} from '../../api/fetchBooks';
import {useBottomScrollListener}  from 'react-bottom-scroll-listener';
import {NavLink} from 'react-router-dom';
import actionsMenu from '../../redux/Menu/actions';
import actionsBooks from '../../redux/Books/actions';
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

const {
  actionLoadingBooks,
  actionAddSkipBooks
} = actionsBooks

const BooksItems = ({data,clickPagination}) => {
  const [updateData, setUpdateData] = useState([]);
  const booksStore = useSelector(state => state.books.booksItems);
  const isLoad = useSelector(state => state.books.isLoad);
  //pagination
  const totalBooks = useSelector(state => state.books.totalBooks); //Кол-во книг;
  const allBooks = useSelector(state => state.books.booksItems);
  const [currentPage, setCurrentPage] = useState(1); //Страница которая сейчас;
  const countNextPage = Math.round(totalBooks / 7);
  const skipPage = useSelector(state => state.books.skipBooks);
  const [loadPages, setLoadPages] = useState(0);
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
        }
      }
      


      console.log(pageNow)

  }

  useEffect(() => {
  }, [allBooks])


  // useBottomScrollListener(() => {
  //   let offset = window.pageYOffset;

  //   //Когда событие выстреливает срабатывает диспаст который переводит состание в загрузку
  //   if (isLoad) {
  //       setCurrentPage(prev => prev + 1);
  //   }
  //   dispatch(actionLoadingBooks())
  //   setLoadPages(prev => prev + 1);
  //   document.documentElement.scrollTop = offset;

  //   if (isLoad) {
      
  //   }else {
      
  //   }

  // }, {
  //   offset: 300,
  //   debounce: 10000,
  //   traggerOnNoScroll: true
  // })

  const load = () => {
    let offset = window.pageYOffset;
    document.documentElement.scrollTop = offset;

    dispatch(actionAddSkipBooks());
    setCurrentPage(prev => prev + 1);

    if (skipPage < countNextPage - 1) {
      getMoreBook(dispatch, 12, 12 * currentPage )
    }else {
      if (document.querySelector('#custom-border')) {
        document.querySelector('#custom-border').id = " ";
      }
      if (document.querySelector('#custom-padding')) {
        document.querySelector('#custom-padding').id = " ";
      }
      if (document.querySelector('#custom-padding-2')) {
        document.querySelector('#custom-padding-2').id = " ";
      }
    }
  }

  useBottomScrollListener(() => {
    load()
  })


  return (
    <div id={'custom-padding-2'}  className="loading_frame row row-cols-1 row-cols-md-1 g-3 row-cols-sm-1 row-cols-lg-1 row-cols-xl-1 ml-auto mr-1" style={{ display: 'flex'}}>
      <Suspense fallback={<LoaderBooks />}>
          {updateData.length ? data.map(item => (<BookItem key={item._id} data={item} />)): <LoaderBooks />}
      </Suspense>
      { skipPage < countNextPage - 2 ?<LoaderMoreBooks /> : null}
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