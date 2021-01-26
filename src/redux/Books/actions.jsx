const actions = {
    FETCH_BOOKS_DATA: "FETCH_BOOKS_DATA",
    MORE_BOOKS_DATA: "MORE_BOOKS_DATA",
    SEARCH_BOOK_DATA: 'SEARCH_BOOK_DATA',
    SEND_BOOK_COMMENT: 'SEND_BOOK_COMMENT',

    onFetchBooksData() {
        return {type: actions.FETCH_BOOKS_DATA}
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