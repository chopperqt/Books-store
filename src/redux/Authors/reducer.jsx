import actions from './actions';

const initialState = {
    authors: [],
    author: [],
    searchAuthor: [],
    totalAuthors: 0,
};

const {
    GET_AUTHORS,
    GET_SEARCH_AUTHOR,
    GET_ONE_AUTHOR,
    GET_TOTAL_AUTHORS
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
        case GET_ONE_AUTHOR:
            return {
                ...state,
                author: payload
            }
        case GET_SEARCH_AUTHOR:
            let search = state.authors.filter(item => item.author_firstname.toLowerCase().includes(payload.toLowerCase()))
            return {
                ...state,
                searchAuthor: search
            }
        case GET_TOTAL_AUTHORS:
            return {
                ...state,
                totalAuthors: payload
            }
        default:
            return {...state}
    }
}