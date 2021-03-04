const actions = {
    GET_BOOKS: "GET_BOOKS",
    MORE_BOOKS_DATA: "MORE_BOOKS_DATA",
    SEARCH_BOOK_DATA: 'SEARCH_BOOK_DATA',
    SEND_BOOK_COMMENT: 'SEND_BOOK_COMMENT',
    GET_SIMILAR_BOOKS: 'GET_SIMILAR_BOOKS', 
    GET_ONE_BOOK: "GET_ONE_BOOK",
    GET_TOTAL_BOOKS: "GET_TOTAL_BOOKS",

    actionGetBooks(data) {
        return {type: actions.GET_BOOKS,payload: data}
    },
    actionMoreBooksData() {
        return {type: actions.MORE_BOOKS_DATA, payload: 20}
    },
    actionGetBook(data) {
        return {type: actions.GET_ONE_BOOK, payload: data}
    },
    actionSearchBookData(search) {
        return {type: actions.SEARCH_BOOK_DATA, payload: search}
    },
    actionSendBookComment(comment) {
        return {type: actions.SEND_BOOK_COMMENT, payload: comment}
    },
    actionGetSimilarBook(similar) {
        return {type: actions.GET_SIMILAR_BOOKS, payload: similar}
    },
    actionGetTotalBooks(number) {
        return {type: actions.GET_TOTAL_BOOKS, payload: number}
    }
}

export default actions;