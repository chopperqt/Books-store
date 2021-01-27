import React, {useEffect} from 'react';
import MenuAction from '../../redux/Menu/actions';

import {NavLink} from 'react-router-dom'

import './style.css';
import { useDispatch, useSelector } from 'react-redux';


const Dashboard = () => {

    const dispath = useDispatch();

    const menuWidth = useSelector(state => state.menu.menuType);
    const cartLength = useSelector(state => state.cart.cart.length);
    const books = useSelector(state => state.books.booksItems.length)
    const authors = useSelector(state => state.authors.authors.length)

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
        <div className="dashboard d-grid align-items-md-center justify-content-md-center align-content-md-center" style={styless}>
            <NavLink to="/cart" className="w-100 d-grid justify-content-md-center linking">
                <i className="bi bi-cart" style={{fontSize: '40px'}}></i>
                <p className="fs-6">Cart</p>
                {cartLength ? <span className="cartLength badge bg-danger">{cartLength}</span> : null}
            </NavLink>
            <NavLink to="/books" className="w-100 d-grid justify-content-md-center linking">
                <i className="bi bi-book" style={{fontSize: '40px'}}></i>
                <p className="fs-6">Books</p>
                {books ? <span className="bookLength badge bg-primary">{books}</span> : null}
            </NavLink>
            <NavLink to="/authors" className="w-100 d-grid justify-content-md-center linking">
                <i className="bi bi-people" style={{fontSize: '40px'}}></i>
                <p className="fs-6">Authors</p>
                {authors ? <span className="bookLength badge bg-primary">{authors}</span>: null}
            </NavLink>
        </div>
    );
}
 
export default Dashboard;