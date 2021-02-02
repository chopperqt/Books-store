const actions = {
    GET_USERS: 'GET_USERS',
    GET_USERS_ERROR: 'GET_USERS_ERROR',

    actionsGetUsers(data) {
        return {type: actions.GET_USERS, payload: data}
    },
    actionsGetUsersError(error) {
        return {type: actions.GET_USERS_ERROR, payload: error}
    }
}

export default actions;