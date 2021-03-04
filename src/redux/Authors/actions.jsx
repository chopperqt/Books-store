const actions = {
    GET_AUTHORS: 'GET_AUTHROS',
    GET_SEARCH_AUTHOR: "GET_SEARCH_AUTHOR",
    GET_ONE_AUTHOR: "GET_ONE_AUTHOR",
    GET_TOTAL_AUTHORS: "GET_TOTAL_AUTHORS",

    actionsGetAuthors(data) {
        return {type: actions.GET_AUTHORS, payload: data}
    },
    actionGetAuthor(data) {
        return {type: actions.GET_ONE_AUTHOR, payload: data}
    },
    actionsGetSearchAuthor(data) {
        return {type: actions.GET_SEARCH_AUTHOR, payload: data}
    },
    actionsGetTotalAuthors(number) {
        return {type: actions.GET_TOTAL_AUTHORS, payload: number}
    }
}


export default actions;