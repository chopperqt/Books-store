import './style.css';
import React , {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {Loader} from '../../components';



const CommentItem = ({data}) => {
    //Redux Store
    const usersStore = useSelector(state => state.users.users);
    //React Store
    const [user, setUser] = useState([]);

    useEffect(() => {
      setUser(usersStore.filter(item => item._id === data._id))
    },[usersStore])

    return (
        <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 mt-1 d-flex">
            <div className="comment_profile">
                {data._id === true ? <i className="bi bi-person-circle"></i>
                : <img src="http://placehold.it/400x300" />}
            </div>
            <div className="col-lg-11 col-md-11 comment ms-2">

                {data.user_id === true ? <h5 className="fs-6 text mb-0">Anonym</h5> : 
                
                <NavLink to={'/user/'+data._id}>
                    {data.lenght !== 0 ? <h5 className="fs-6 text mb-0">{data.fullname}</h5> : <Loader />}
                    
                </NavLink>

                }

                
                <p className="text-break" style={{fontSize: '14px'}}>{data.comment}</p>
            </div>
        </div>
    );
}
 
export default CommentItem;