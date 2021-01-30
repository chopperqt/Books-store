import './style.css';
import { useDispatch, useSelector } from 'react-redux';

import booksActions from '../../redux/Books/actions';
import { useEffect } from 'react';



const Wrapper = ({children}) => {

    const dispath = useDispatch();
    const paddingWrapper = useSelector(state => state.menu.menuType);
    

    const styless = {
        marginLeft: paddingWrapper === 1 ? '0px' : paddingWrapper === 2 ? '90px' : '150px',  
        transition: '.15s ease-in-out'
    }

    return (
        <div className='wrapper' style={styless}>
            {children}
        </div>
    );
}
 
export default Wrapper;