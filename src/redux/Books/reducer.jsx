import books from '../../contacts/books.json';

import actions from './actions';

const bookItems = JSON.parse(JSON.stringify(books));


const initialState = [bookItems];

const {
    FETCH_BOOKS_DATA,
} = actions;

//JSON.parse(books)

export const booksStore = (
    state = initialState,
    {type, payload}
) => {
    switch (type) {
        case FETCH_BOOKS_DATA:
            return {
                ...state,
            }
        default:
            return state
    }
}