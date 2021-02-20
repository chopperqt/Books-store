import React , {Suspense, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actionsMenu from '../../redux/Menu/actions';

const AuthorsItems = () => {
    const dispatch = useDispatch()
    const AuthorItem = React.lazy(() => import('../../components/AuthorItem'));
    const AuthorStore = useSelector(state => state.authors.authors);

    const {
        actionOpenFullMenu,
        actionSetHistoryType,
    } = actionsMenu

    useEffect(() => {
        dispatch(actionOpenFullMenu(1));
        dispatch(actionSetHistoryType(true))
    }, [])

    return (
        <div className="row row-cols-1 row-cols-md-2 g-6 row-cols-sm-1 row-cols-lg-3 row-cols-xl-4 ml-auto mr-3" style={{padding: '20px'}}>
            
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