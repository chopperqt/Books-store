import { NavLink } from 'react-router-dom';

const AuthorItem = ({data}) => {
    return (
        <div className="col mt-3">
            <NavLink to={"author/"+ data._id}>
                <div className="card h-100 w-100">
                    <img src="http://placehold.it/400x300" className="card-item-top" alt="Some img"/>
                </div>
            </NavLink>
        </div>
    );
}
 
export default AuthorItem;