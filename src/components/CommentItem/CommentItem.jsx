import './style.css';

const CommentItem = ({data}) => {
    return (
        <div className="col-lg-12 col-md-12 mt-4 d-flex">
            <div className="col-lg-1 col-md-1 comment_profile"><img src="https://placehold.it/200x200"></img></div>
            <div className="col-lg-11 col-md-11 comment">
                <h5>Name Lastname</h5>
                <p>{data.comment}</p>
            </div>
        </div>
    );
}
 
export default CommentItem;