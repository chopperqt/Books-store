import './style.css';

import {useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import {NavLink} from 'react-router-dom';

const BookProfile = () => {
    const books = useSelector(state => state.books.booksItems)
    const {id} = useParams();

    const filterBooks = books.filter(item => item._id === id);

    //data
    let name = filterBooks[0].book_name;
    let description = filterBooks[0].book_descriprion;
    let country = filterBooks[0].book_county;
    let picture = filterBooks[0].book_picture
    return (
        <div className="col p-5">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                    <li class="breadcrumb-item"><NavLink to="/books">Books</NavLink></li>
                    <li class="breadcrumb-item active" aria-current="page">{name}</li>
                </ol>
            </nav>
            <h1>Some Profile id {id}</h1>
            <img src={picture} alt={name} />
            <h1>{filterBooks[0].book_name}</h1>
            <h2>{country}</h2>
            <p>{description}</p>
        </div>
    );
}
 
export default BookProfile;