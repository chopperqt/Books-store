import actions from './actions';

const initialState = {
    menuType: 1,
    historyType: true
}

const {
    OPEN_FULL_MENU,
    OPEN_SHORT_MENU,
    CLOSE_MENU,
    SET_HISTORY_TYPE,
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
        case CLOSE_MENU:
            return {
                ...state,
                menuType: payload
            }
        case SET_HISTORY_TYPE:
            return {
                ...state,
                historyType: payload
            }
        default:
            return state;
    }
}