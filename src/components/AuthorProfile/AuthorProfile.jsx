import React , {useState} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthorProfile = () => {
    const books = useSelector(state => state.books.booksItems);
    const authors = useSelector(state => state.authors.authors);
    const {id} = useParams();
    const author = authors.filter(item => item._id === id)
    
    //author[0].author_books.map()
    console.log(author)
    let authorBook = books.filter(book => !author.some(authorBook => authorBook.author_books == book._id))

    console.log(authorBook);
    return (
        <div className="col-md-12 col-lg-12 mt-4">
            <div className="col-sm-8">
                <img src={author[0].author_picture} className="w-100 img-fluid img-thumbnail" alt="Author photo"/>
            </div>
            <div className="col-sm-12 mt-4">
                <h1>Information: </h1>
                <h3>Name: {author[0].author_firstname} {author[0].author_lastname}</h3>
                <h3>Bird day: {author[0].author_data}</h3>
                <h3>Age: {author[0].author_age}</h3>
                <h3>Country: {author[0].author_country}</h3>
                <h3>Adress: {author[0].author_address}</h3>
                <h3>Phone: {author[0].author_phone}</h3>
                <h3>Email: {author[0].author_email}</h3>
                <h1>Bio:</h1>
                <h3>{author[0].author_description}</h3>
                <h1>Books: </h1>
                <div>

                </div>
            </div>
        </div>
    );
}
 
export default AuthorProfile;