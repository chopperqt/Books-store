const initialState = {
    posts: [
        {
            name: 'Ilya',
            surname: "Tsvetkov"
        },
        {
            name: 'Kolya',
            surname: 'Ivanov'
        }
    ]
}


export default function(
    state = initialState,
    {type, payload}
) {
    switch (type) {
        case 'LOAD_FROM_DATA':
            return {
                ...state,
                posts: payload.data
            }
    
        default:
            break;
    }
}