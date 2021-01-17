import React, {useEffect} from 'react';
import MenuAction from '../../redux/Menu/actions';

import './style.css';
import { useDispatch, useSelector } from 'react-redux';


const Dashboard = () => {

    const dispath = useDispatch();

    const menuWidth = useSelector(state => state.menu.menuType);

    const styless = {
        width: menuWidth === 1 ? '0px' : menuWidth === 2 ? '90px' : '150px',
        transition: '.15s ease-in-out'
    }
    
    const {
        actionInitialMenu
    } = MenuAction;

    useEffect(() => {
        dispath(actionInitialMenu())
    }, [])

    return (
        <div className="dashboard" style={styless}>
            <i class="bi bi-cart-plus"></i>
            Dashboard <br/>
            {menuWidth}
        </div>
    );
}
 
export default Dashboard;