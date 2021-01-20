const actions = {
    FETCH_BOOKS_DATA: "FETCH_BOOKS_DATA",
    MORE_BOOKS_DATA: "MORE_BOOKS_DATA",

    onFetchBooksData() {
        return {type: actions.FETCH_BOOKS_DATA}
    },
    actionMoreBooksData() {
        return {type: actions.MORE_BOOKS_DATA, payload: 20}
    }
}

export default actions;