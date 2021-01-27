
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthorProfile = () => {
    const books = useSelector(state => state.books.booksItems);
    const authors = useSelector(state => state.authors.authors);
    const {id} = useParams();
    const author = authors.filter(item => item._id === id)
    
    return (
        <div className="col-md-12 col-lg-12 mt-4">
            <div className="col-sm-12">
                <img src={author[0].author_picture} className="img-fluid img-thumbnail" alt="Author photo"/>
            </div>
        </div>
    );
}
 
export default AuthorProfile;