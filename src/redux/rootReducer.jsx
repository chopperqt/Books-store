import {combineReducers} from 'redux';

//reducers
import { postReducer } from './Posts/reducer';
import { menuReducer } from './Menu/reducer';
import { booksStore } from './Books/reducer';
import { headerReducer } from './Header/reducer';
import { cartReducer } from './Cart/reducer';
import { authorsReducer } from './Authors/reducer';
import { usersReducer } from './Users/reducer';


export const rootReducer =  combineReducers({
    posts: postReducer,
    menu: menuReducer,
    books: booksStore,
    header: headerReducer,
    cart: cartReducer,
    authors: authorsReducer,
    users: usersReducer
});
