const initialState = {
    posts: [
        
    ]
}



export const  postReducer = (
    state = initialState,
    {type, payload}
) => {
    switch (type) {
        case 'LOAD_FROM_DATA':
            return {
                ...state,
            }
        case 'ADD_ITEM_TO_DATA':
            console.log(payload)
            return {
                ...state,
                posts: [...state.posts,payload]
            }
        default:
            return state;
    }
}