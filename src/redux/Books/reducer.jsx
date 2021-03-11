import books from '../../contacts/books.json';
import _ ,{ filter } from 'lodash';
import actions from './actions';


const initialState = {
    limit: 12,
    booksItems: [],
    bookItem: [],
    bookGenres: [],
    searchBook: [],
    searching: false,
    isLoad: false,
    similarBooks: [],
    totalBooks: 0,
    skipBooks: 0,
};

const {
    GET_BOOKS,
    MORE_BOOKS_DATA,
    SEARCH_BOOK_DATA,
    SEND_BOOK_COMMENT,
    GET_SIMILAR_BOOKS,
    GET_ONE_BOOK,
    GET_BOOK_GENRES,
    GET_TOTAL_BOOKS,
    LOADING_BOOKS,
    ADD_SKIP_BOOKS
} = actions;

//JSON.parse(books)

export const booksStore = (
    state = initialState,
    {type, payload}
) => {
    switch (type) {
        case GET_BOOKS:
            return {
                ...state,
                booksItems: payload,
                isLoad: true
            }
        case MORE_BOOKS_DATA:
            return {
                ...state,
                booksItems: state.booksItems.concat(payload),
                isLoad: true
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
        case GET_SIMILAR_BOOKS: 
        let filterBook = [];
            if (payload !== undefined) {
                
                let filterGenres = [];
                let filterBook = [];

                _.forEach(payload.book_genres, (item, index) => {
                    if (item === true) {
                        filterGenres = {[index]: item  ,...filterGenres}
                    }
                })

                _.forEach(state.booksItems, book => {
                    let findPayload = _.find(filterGenres, genres => book.book_genres[genres] === true);
                    if (findPayload) {
                        filterBook = [book, ...filterBook]
                    }
                })

                console.log(filterBook)

            }
            return {
                ...state,
                similarBooks: []
            }
        case SEARCH_BOOK_DATA:
            if (payload.length !== 0) {
                let filterSeacthBook = state.booksItems.filter(item => item.book_name.toLowerCase().includes(payload.toLowerCase()));
                if (filterSeacthBook.length !== 0) {
                    console.log('In ')
                    return {
                        ...state,
                        searchBook: filterSeacthBook,
                        searching: true
                    }
                }else {
                    return {
                        ...state,
                        searchBook: false,
                        searching: true,
                    }
                }
            }else {
                return {
                    ...state,
                    searchBook: [],
                    searching: false
                }
            }
        case GET_ONE_BOOK:
            return {
                ...state,
                bookItem: payload
            }
        case GET_TOTAL_BOOKS:
            return {
                ...state,
                totalBooks: payload
            }
        case LOADING_BOOKS:
            return {
                ...state,
                isLoad: false
            }
        case ADD_SKIP_BOOKS:
            return {
                ...state,
                skipBooks: state.skipBooks + 1
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