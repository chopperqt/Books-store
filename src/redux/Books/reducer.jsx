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
    SEND_BOOK_COMMENT
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
        case SEND_BOOK_COMMENT:
            let book_id = payload.book_id;
            let user_id = payload.user_id;
            let comment = payload.comment;
            let data = {
                user_id: user_id,
                book_id: book_id,
                comment: comment
            }

            let array = [];
            state.booksItems.map(item => {
                if (item._id === book_id) {
                    item.book_comments.unshift(data)
                }
                array.push(item)
            })

            return {
                ...state,
                booksItems: array
            }
        case SEARCH_BOOK_DATA:
            if (payload.length !== 0) {
                console.log(state);
                let filterSeacthBook = state.booksItems.filter(item => item.book_name.toLowerCase().includes(payload.toLowerCase()));

                console.log(filterSeacthBook)

                if (filterSeacthBook.length !== 0) {
                    console.log('In ')
                    return {
                        ...state,
                        searchBook: filterSeacthBook
                    }
                }else {
                    return {
                        ...state,
                        searchBook: false
                    }
                }
            }else {
                return {
                    ...state,
                    searchBook: []
                }
            }

            // if (payload) {
            //     return {
            //         ...state,
            //         searchBook: state.booksItems.filter(item => item.book_name.toLowerCase().includes(payload.toLowerCase()))
            //     }
            // }else {
            //     return {
            //         ...state,
            //         searchBook: []
            //     }
            // }
            
        default:
            return state
    }
}