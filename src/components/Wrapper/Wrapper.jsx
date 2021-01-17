import './style.css';
import { useSelector } from 'react-redux';



const Wrapper = ({children}) => {

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