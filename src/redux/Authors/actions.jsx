const actions = {
    GET_AUTHORS: 'GET_AUTHROS',
    GET_SEARCH_AUTHOR: "GET_SEARCH_AUTHOR",

    actionsGetAuthors(data) {
        return {type: actions.GET_AUTHORS, payload: data}
    },
    actionsGetSearchAuthor(data) {
        return {type: actions.GET_SEARCH_AUTHOR, payload: data}
    }
}


export default actions;