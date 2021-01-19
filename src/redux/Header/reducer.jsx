import actions from './actions';

const initialState = {
    fullScreen: false
}

const {
    HEADER_FULLSCREEN_MODE,
} = actions;

export const headerReducer = (
    state = initialState,
    {type, payload}
) => {
    switch (type) {
        case HEADER_FULLSCREEN_MODE:
            return {
                ...state,
                fullScreen: !state.fullScreen
            }
        default:
            return state;
    }
}
