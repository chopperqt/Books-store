import { NavLink } from 'react-router-dom';
import './style.css';

const AuthorItem = ({data}) => {
    return (
        <div className={"avatar__second avatar-"+data.author_avatar__type}>
            <NavLink to={"author/"+ data._id}>
                <div className="card">
                    <img src="http://placehold.it/400x400" className="card-item-top" alt="Some img"/>
                </div>
            </NavLink>
        </div>
    );
}
 
export default AuthorItem;