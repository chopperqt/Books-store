import {combineReducers} from 'redux';

//reducers
import { postReducer } from './Posts/reducer';
import { menuReducer } from './Menu/reducer';





export const rootReducer =  combineReducers({
    posts: postReducer,
    menu: menuReducer
});
