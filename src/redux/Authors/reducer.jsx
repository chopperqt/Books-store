import actions from './actions';

const initialState = {
    authors: [],
    searchAuthor: [],
};

const {
    GET_AUTHORS,
    GET_SEARCH_AUTHOR
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
        case GET_SEARCH_AUTHOR:
            let search = state.authors.filter(item => item.author_firstname.toLowerCase().includes(payload.toLowerCase()))
            return {
                ...state,
                searchAuthor: search
            }
        default:
            return {...state}
    }
}