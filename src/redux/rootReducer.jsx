import {combineReducers} from 'redux';

//reducers
import { postReducer } from './Posts/reducer';





export const rootReducer =  combineReducers({
    posts: postReducer
});
