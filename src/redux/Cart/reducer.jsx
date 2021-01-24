import actions from './actions';

const {
    ACTION_ADD_BOOK_TO_CART,
    ACTION_REMOVE_BOOK_FROM_CART
} = actions;

const initilaState = {
    cart: []
}


export const cartReducer = (
    state = initilaState,
    {type,payload}
) => {
    switch (type) {
        case ACTION_ADD_BOOK_TO_CART:
            return {
                ...state,
                cart: [...state.cart,payload]
            }
        case ACTION_REMOVE_BOOK_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(item => item._id !== payload)
            }
        default:
            return {
                ...state
            }
    }
}