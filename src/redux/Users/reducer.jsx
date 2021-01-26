import userData from '../../contacts/users.json';

const initialState = {
    users: userData
}


export const usersReducer = (
    state = initialState,
    {type, payload}
) => {
    switch (type) {
        default:
            return {
                ...state
            };
    }
}