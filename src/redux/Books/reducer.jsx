import books from '../../contacts/books.json';

import actions from './actions';

const bookItems = JSON.parse(JSON.stringify(books));


const initialState = {
    limit: 20,
    booksItems: bookItems
};

const {
    FETCH_BOOKS_DATA,
    MORE_BOOKS_DATA
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
        case MORE_BOOKS_DATA:
            return {
                ...state,
                limit: state.limit + payload
            }
        default:
            return state
    }
}