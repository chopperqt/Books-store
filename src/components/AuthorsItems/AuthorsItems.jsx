import React , {Suspense, useEffect} from 'react';
import './style.css';
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
        <div className="col-md-12 col-sm-12 col-lg-12 col-xs-12 author__main" style={{padding: '20px'}}>
            
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