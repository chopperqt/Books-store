import books from '../../contacts/books.json';

import actions from './actions';

const bookItems = JSON.parse(JSON.stringify(books));


const initialState = {
    limit: 20,
    booksItems: bookItems,
    searchBook: [],
};

const {
    FETCH_BOOKS_DATA,
    MORE_BOOKS_DATA,
    SEARCH_BOOK_DATA,
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
        case SEARCH_BOOK_DATA:
            if (payload.length) {
                return {
                    ...state,
                    searchBook: state.booksItems.filter(item => item.book_name.toLowerCase().includes(payload.toLowerCase()))
                }
            }else {
                return {
                    ...state,
                    searchBook: []
                }
            }
            
        default:
            return state
    }
}