const actions = {
    GET_AUTHORS: 'GET_AUTHROS',

    actionsGetAuthors(data) {
        return {type: actions.GET_AUTHORS, payload: data}
    }
}


export default actions;