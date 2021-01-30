const actions = {
    GET_BOOKS: "GET_BOOKS",
    MORE_BOOKS_DATA: "MORE_BOOKS_DATA",
    SEARCH_BOOK_DATA: 'SEARCH_BOOK_DATA',
    SEND_BOOK_COMMENT: 'SEND_BOOK_COMMENT',

    actionGetBooks(data) {
        return {type: actions.GET_BOOKS,payload: data}
    },
    actionMoreBooksData() {
        return {type: actions.MORE_BOOKS_DATA, payload: 20}
    },
    actionSearchBookData(search) {
        return {type: actions.SEARCH_BOOK_DATA, payload: search}
    },
    actionSendBookComment(comment) {
        return {type: actions.SEND_BOOK_COMMENT, payload: comment}
    }
}

export default actions;