import axios from 'axios';
import actionBooks from '../redux/Books/actions';

const {
    actionGetBooks,
    actionGetBook,
    actionGetTotalBooks
} = actionBooks

export const getAllBooks = (url,disaptch) => {
    axios.get(url)
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