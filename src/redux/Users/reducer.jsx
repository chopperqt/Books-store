import userData from '../../contacts/users.json';
import actions from './actions';
import axios from 'axios';

const initialState = {
    users: userData,
    getUsers: []
}

const {
    GET_USERS
} = actions;

export const usersReducer = (
    state = initialState,
    {type, payload}
) => {
    switch (type) {
        case GET_USERS:
            let headers = {
                'Access-Control-Allow-Origin': '*'
            }
            let data = [];

            axios.get('https://api.allorigins.win/raw?url=http://test.zrkcompany.ru/users.json')
            .then(response => console.log(response.data))
            .catch(function (error) {
              // handle error
              console.log(error);
            })


            return {
                ...state,

            }
        default:
            return {
                ...state
            };
    }
}