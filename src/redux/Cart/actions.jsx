const actions = {
    ACTION_ADD_BOOK_TO_CART: 'ADD_TO_CART',
    ACTION_REMOVE_BOOK_FROM_CART: 'REMOVE_FROM_CART',
    ACTION_ADD_BOOK_SELECTED: "ACTION_ADD_BOOK_SELECTED",
    ACTION_REMOVE_BOOK_SELECTED: "ACTION_REMOVE_BOOK_SELECTED",

    actionAddBookToCart(id) {
        return {type: actions.ACTION_ADD_BOOK_TO_CART, payload: id}
    },
    actionRemoveBookFromCart(id) {
        return {type: actions.ACTION_REMOVE_BOOK_FROM_CART, payload: id}
    },
    actionAddSelected(id) {
        return {type: actions.ACTION_ADD_BOOK_SELECTED, payload: id}
    },
    actionRemoveSelected(id) {
        return {type: actions.ACTION_REMOVE_BOOK_SELECTED, payload: id}
    }
}

export default actions;