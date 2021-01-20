import './style.css';

import {useParams} from 'react-router-dom';

const BookProfile = () => {

    const {id} = useParams();


    return (
        
        <div className="bookProfile">
            <h1>Some Profile id {id}</h1>
        </div>
    );
}
 
export default BookProfile;