const actions = {
    FETCH_BOOKS_DATA: "FETCH_BOOKS_DATA",

    onFetchBooksData() {
        return {type: actions.FETCH_BOOKS_DATA}
    }
}

export default actions;