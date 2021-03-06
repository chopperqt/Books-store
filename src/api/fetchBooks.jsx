import axios from 'axios';
import actionBooks from '../redux/Books/actions';

import {
    ALL_BOOKS_URL
} from './urls';

const {
    actionGetBooks,
    actionGetBook,
    actionGetTotalBooks
} = actionBooks

export const getAllBooks = (disaptch,limit,skip) => {
    axios.get(ALL_BOOKS_URL, {headers: {'limit': limit,'skip': skip}})
    .then(response => {
        disaptch(actionGetBooks(response.data))
    })
    .catch(error => {
        console.log(error);
    })
}
export const getOneBook = (url,dispatch) => {
    axios.get(url)
    .then(response => {
        dispatch(actionGetBook(response.data))
    })
    .catch(error => {
        console.log(error);
    })
}

export const getTotalBooks = (url, dispatch) => {
    axios.get(url)
    .then(response => {
        dispatch(actionGetTotalBooks(response.data));
    })
    .catch(error => {
        console.log(error);
    })
}