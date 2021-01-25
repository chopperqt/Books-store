import './style.css';

const CommentItem = () => {
    return (
        <div className="col-lg-12 col-md-12 mt-4 d-flex">
            <div className="col-lg-1 col-md-1 comment_profile"><img src="https://placehold.it/200x200"></img></div>
            <div className="col-lg-11 col-md-11 comment">
                <h5>Name Lastname</h5>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro exercitationem libero eum laudantium vero fugit rerum minus aspernatur blanditiis? Blanditiis sed eligendi temporibus sapiente nulla, asperiores deleniti modi perspiciatis sint!</p>
            </div>
        </div>
    );
}
 
export default CommentItem;