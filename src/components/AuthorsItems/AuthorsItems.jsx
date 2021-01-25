import React , {Suspense} from 'react';


import { useSelector } from 'react-redux';

const AuthorsItems = () => {
    const AuthorItem = React.lazy(() => import('../../components/AuthorItem'));
    const AuthorStore = useSelector(state => state.authors.authors);

    return (
        <div className="row row-cols-1 row-cols-md-2 g-6 row-cols-sm-1 row-cols-lg-3 row-cols-xl-4 ml-auto mr-3">
            
            <Suspense fallback={<div>Загрузка...</div>}>
                {
                    AuthorStore.length ? AuthorStore.map(item => (<AuthorItem key={item._id} data={item} />)) : AuthorStore.map(item => (
                        <AuthorItem data={item} />
                    ))
                }

            </Suspense>
        </div>
    );
}
 
export default AuthorsItems;