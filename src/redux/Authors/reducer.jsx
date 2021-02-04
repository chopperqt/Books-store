import actions from './actions';

const initialState = {
    authors: []
};

const {
    GET_AUTHORS
} = actions

export const authorsReducer = (
    state = initialState,
    {type, payload}
) => {
    switch (type) {
        case GET_AUTHORS:
            return {
                ...state,
                authors: payload
            }
        default:
            return {...state}
    }
}