import authors from '../../contacts/authors.json';

const authorsItems = JSON.parse(JSON.stringify(authors));

const initialState = {
    authors: authorsItems
};

export const authorsReducer = (
    state = initialState,
    {type, payload}
) => {
    switch (type) {
        case 'test':
            
            break;
    
        default:
            return {...state}
    }
}