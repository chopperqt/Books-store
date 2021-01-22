import React,{Suspense,lazy} from 'react';
import { useSelector } from 'react-redux';
import {NavLink} from 'react-router-dom';
const BookItem = React.lazy(() => import('../../components/BookItem')) 



const BooksItems = ({data}) => {

    const booksStore = useSelector(state => state.books.booksItems);
    const limit = useSelector(state => state.books.limit);
    const searchBook = useSelector(state => state.books.searchBook);

    let books = booksStore.slice(0,limit);


    return (
        <div className="row row-cols-1 row-cols-md-2 g-6 row-cols-sm-1 row-cols-lg-3 row-cols-xl-4 ml-auto mr-3">
            
            <Suspense fallback={<div>Загрузка...</div>}>
                {
                    searchBook.length ? searchBook.map(item => (<BookItem data={item} />)) : books.map(item => (
                        <BookItem data={item} />
                    ))
                }

            </Suspense>
        </div>
    );
}
 
export default BooksItems;