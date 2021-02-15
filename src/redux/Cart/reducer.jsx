import actions from './actions';

const {
    ACTION_ADD_BOOK_TO_CART,
    ACTION_REMOVE_BOOK_FROM_CART,
    ACTION_ADD_BOOK_SELECTED,
    ACTION_REMOVE_BOOK_SELECTED
} = actions;

const initilaState = {
    cart: [],
    cartSelected: [],
    price: 0,
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
        case ACTION_ADD_BOOK_SELECTED:
            return {
                ...state,
                cartSelected: [...state.cartSelected,payload.id],
                price: state.price + payload.price
            }
        case ACTION_REMOVE_BOOK_SELECTED:
            return {
                ...state,
                cartSelected: state.cartSelected.filter(item => item !== payload.id),
                price: state.price - payload.price
            }
        default:
            return {
                ...state
            }
    }
}