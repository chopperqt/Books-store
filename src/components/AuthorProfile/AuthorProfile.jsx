import React , {useState} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './style.css';
import {
    WrapperColor
} from '../../components';

const AuthorProfile = () => {
    const books = useSelector(state => state.books.booksItems);
    const authors = useSelector(state => state.authors.authors);
    const {id} = useParams();
    const author = authors.filter(item => item._id === id)
    
    let authorBook = books.filter(book => !author.some(authorBook => authorBook.author_books == book._id))

    return (
        <div className="col-md-12 col-lg-12 mt-4">
            <WrapperColor>
                <div className="d-flex p-4">
                    <div className="col-sm-3 col-lg-3 col-xs-3">
                        <img src={author[0].author_picture} className="w-100 h-100 img-fluid img-thumbnail" alt="Author photo"/>
                    </div>
                    <div className="col-sm-9 col-lg-9 col-md-9 mt-4 ms-2">
                        <h5 className="w-100" style={{borderBottom: '1px solid #ced4da'}}>Detailed information:</h5>
                        <h5 className="fs-6"><span className="text-muted">Name:</span> {author[0].author_firstname} {author[0].author_lastname}</h5>
                        <h5 className="fs-6"><span className="text-muted">Bird day:</span> {author[0].author_data}</h5>
                        <h3 className="fs-6"><span className="text-muted">Age:</span> {author[0].author_age}</h3>
                        <h3 className="fs-6"><span className="text-muted">Country:</span> {author[0].author_country}</h3>
                        <h3 className="fs-6"><span className="text-muted">Adress:</span> {author[0].author_address}</h3>
                        <h3 className="fs-6"><span className="text-muted">Phone:</span> {author[0].author_phone}</h3>
                        <h3 className="fs-6"><span className="text-muted">Email:</span> {author[0].author_email}</h3>
                        
                    </div>
                </div>
            </WrapperColor>
            <div className="">
                <WrapperColor>
                    <div className='col-md-12 col-sm-12 col-lg-12 p-4'>
                        <h5>Biography:</h5>
                        <p>{author[0].author_description}</p>
                    </div>
                </WrapperColor>
                <WrapperColor>
                    <div className="col-md-12 col-sm-12 col-lg-12 p-4">
                        <h5>Books: </h5>
                    </div>
                </WrapperColor>
            </div>
        </div>
    );
}
 
export default AuthorProfile;