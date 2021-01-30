//import userData from '../../contacts/users.json';
import actions from './actions';
import axios from 'axios';

const initialState = {
    users: [],
    getUsers: [],
    isError: '',
    isLoad: false
}


const {
    GET_USERS,
    GET_USERS_ERROR
} = actions;

export const usersReducer = (
    state = initialState,
    {type, payload}
) => {
    switch (type) {
        case GET_USERS:
            return {
                ...state,
                users: payload
            };
        case GET_USERS_ERROR:
            return {
                ...state,
                isError: payload
            }
        default:
            return {
                ...state
            };
    }
}