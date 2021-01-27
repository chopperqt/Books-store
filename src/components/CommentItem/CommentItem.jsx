import './style.css';

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';



const CommentItem = ({data}) => {


    const usersStore = useSelector(state => state.users.users);

    const filterUsersStore = usersStore.filter(item => item._id === data.user_id)

    return (
        <div className="col-lg-12 col-md-12 mt-4 d-flex">
            <div className="col-lg-1 col-md-1 comment_profile"><img src="https://placehold.it/200x200"></img></div>
            <div className="col-lg-11 col-md-11 comment">

                {data.user_id === true ? <h5>Anonym</h5> : 
                
                <NavLink to={'/user/'+data.user_id}>
                    <h5>{filterUsersStore[0].user_firstname} {filterUsersStore[0].user_lastname}</h5>
                </NavLink>

                }

                
                <p>{data.comment}</p>
            </div>
        </div>
    );
}
 
export default CommentItem;