import axios from 'axios';
import actionAuthors from '../redux/Authors/actions';

const {
    actionsGetAuthors,
    actionGetAuthor,
    actionsGetTotalAuthors
} = actionAuthors;

export const getAllAuthors = (url, dispatch) => {
    axios.get(url)
    .then(response => {
        dispatch(actionsGetAuthors(response.data))
    })
    .catch(error => {
        console.log(error)
    })
}

export const  getOneAuthor = (url, dispatch) => {
    axios.get(url)
    .then(response => {
        dispatch(actionGetAuthor(response.data))
    })
    .catch(error => {
        console.log(error)
    })
}

export const getTotalAuthors = (url, dispatch) => {
    axios.get(url)
    .then(response => {
        dispatch(actionsGetTotalAuthors(response.data))
    })
    .catch(error => [
        console.log(error)
    ])
}