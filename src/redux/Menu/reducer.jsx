import actions from './actions';

const initialState = {
    menuType: 2
}

const {
    OPEN_FULL_MENU,
    OPEN_SHORT_MENU,
    CLOSE_MENU
} = actions;

export const menuReducer = (
    state = initialState,
    {type, payload}
) => {
    switch (type) {
        case OPEN_FULL_MENU:
            return {
                ...state,
                menuType: payload
            }
        case OPEN_SHORT_MENU:
            return {
                ...state,
                menuType: payload
            }
            case CLOSE_MENU:
                return {
                    ...state,
                    menuType: payload
                }
        default:
            return state;
    }
}