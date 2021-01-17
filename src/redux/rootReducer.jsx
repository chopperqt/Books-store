import {combineReducers} from 'redux';

//reducers
import { postReducer } from './Posts/reducer';
import { menuReducer } from './Menu/reducer';
import { booksStore } from './Books/reducer';






export const rootReducer =  combineReducers({
    posts: postReducer,
    menu: menuReducer,
    books: booksStore,
});
