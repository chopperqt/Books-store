import './style.css';

import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {NavLink} from 'react-router-dom';
import actionsBooks from '../../redux/Books/actions';
import { useEffect, useState } from 'react';
import {CommentItem} from '../../components';

const BookProfile = () => {
    const books = useSelector(state => state.books.booksItems);
    const [areaTextLength, setAreaTextLength] = useState(0);
    const [user, setUser] = useState(true);
    const {id} = useParams();
    const [commentValue, setCommentValue] = useState('');

    const filterBooks = books.filter(item => item._id === id);
    const dispath = useDispatch();

    //data
    let name = filterBooks[0].book_name;
    let description = filterBooks[0].book_descriprion;
    let country = filterBooks[0].book_county;
    let picture = filterBooks[0].book_picture;

    const {
        actionSearchBookData,
        actionSendBookComment
    } = actionsBooks
    
    useEffect(() => {
        //dispath(actionSearchBookData())
    }, []);

    function sendComment() {

        console.log('work')
        let book_id = filterBooks[0]._id;
        let user_id = '600ffbc6d55857f4929aac6c';

        let data = {
            book_id: book_id,
            user_id: user,
            comment: commentValue
        }

        if (areaTextLength) {
            dispath(actionSendBookComment(data))
        }
        

        setCommentValue('');
        setAreaTextLength(0);
    }


    return (
        <div className="col-md-12 p-5">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                    <li className="breadcrumb-item"><NavLink to="/books">Books</NavLink></li>
                    <li className="breadcrumb-item active" aria-current="page">{name}</li>
                </ol>
            </nav>
            <div className="col-md-12 d-md-flex d-lx-flex">
                <div className="col-md-6 col-lg-6 col-sm-12">
                    <img src={picture} alt={name} style={{height: '600px', width: '100%'}} />
                </div>
                <div className="col-md-6 pr-5 col-lg-6">
                    <h1>Name: {filterBooks[0].book_name}</h1>
                    <h2>Pages: {filterBooks[0].book_pages}</h2>
                    <h2>Age limit: {filterBooks[0].book_age_limit}</h2>
                    <h3>Bestsellers: {filterBooks[0].book_bestsellers ? 'Yes' : 'No'}</h3>
                    <h4>Rating: {filterBooks[0].book_rating} / 5</h4>
                    <h5>Price: <span className="text-primary">{filterBooks[0].book_price}$</span></h5>
                </div>
            </div>
            <div className="col-md-12 mt-4">
                <p>{filterBooks[0].book_description}</p>
            </div>
            <div className="col-md-12 mt-4">
                <h2>Add comment:</h2>
                <div className="form-floating mt-4">
                    <textarea className="form-control" value={commentValue} onChange={e => {setAreaTextLength(e.target.value.length);setCommentValue(e.target.value)}} placeholder="Leave a comment here" id="floatingTextarea2" style={{height: '100px'}}></textarea>
                    <label for="floatingTextarea2">Comments</label><label style={{left: '80px'}} htmlFor="floatingTextarea2">{areaTextLength}</label>
                </div>
                <div className="col-md-12 d-flex justify-content-end">
                    <button onClick={sendComment} className="btn btn-primary d-flex mt-2">Send</button>
                </div>
                
            </div>
            <div className="col-md-12 col-lg-12 mt-4">
                <h2><i className="bi bi-chat me-2 comments_leng"><span>{filterBooks[0].book_comments.length}</span></i>Comments:</h2>
                {filterBooks[0].book_comments.length ? filterBooks[0].book_comments.map(item => (
                    <CommentItem key={item._id} data={item} />
                )) : <h5 className="text-muted">There are no comments. Be the first!</h5>}
                
            </div>
        </div>
    );
}
 
export default BookProfile;