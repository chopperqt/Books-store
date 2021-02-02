import React, {useEffect} from 'react';
import MenuAction from '../../redux/Menu/actions';
import {NavLink, Route} from 'react-router-dom'

import './style.css';
import { useDispatch, useSelector } from 'react-redux';

import {
    SmallMenu
} from '../../components';


const Dashboard = () => {

    const dispath = useDispatch();

    const menuWidth = useSelector(state => state.menu.menuType);
    const cartLength = useSelector(state => state.cart.cart.length);
    const books = useSelector(state => state.books.booksItems.length)
    const authors = useSelector(state => state.authors.authors.length)

    const styless = {
        width: menuWidth === 1 ? '0px' : menuWidth === 2 ? '90px' : '320px',
        transition: '.15s ease-in-out'
    }
    
    const {
        actionInitialMenu,
        actionDasboardOpen
    } = MenuAction;

    useEffect(() => {
        dispath(actionInitialMenu())
    }, [dispath])
    return (
        <div className="dashboard" style={styless}>
            <div className="menu__left">
                <NavLink to="/cart" className="d-grid justify-content-md-center linking">
                    <i className="bi bi-cart" style={{fontSize: '40px'}}></i>
                    <p className="fs-6">Cart</p>
                    {cartLength ? <span className="cartLength badge bg-danger">{cartLength}</span> : null}
                </NavLink>
                <NavLink to="/books" className="d-grid justify-content-md-center linking" onClick={() => dispath(actionDasboardOpen())}>
                    <i className="bi bi-book" style={{fontSize: '40px'}}></i>
                    <p className="fs-6">Books</p>
                    {books ? <span className="bookLength badge bg-primary">{books}</span> : null}
                </NavLink>
                <NavLink to="/authors" className="d-grid justify-content-md-center linking">
                    <i className="bi bi-people" style={{fontSize: '40px'}}></i>
                    <p className="fs-6">Authors</p>
                    {authors ? <span className="bookLength badge bg-primary">{authors}</span>: null}
                </NavLink>
            </div>
            <div className="dashboard_line"></div>
            <div className="menu__right">
                <Route path="/books">
                    <SmallMenu>
                        <a href="/"><i className="bi bi-bag"></i> Bestseller's</a>
                        <a href="/"><i className="bi bi-gear"></i> Gear's</a>
                        <a href="/"><i className="bi bi-bicycle"></i> Sport's</a>
                        <a href="/"><i className="bi bi-binoculars"></i> Travel's</a>
                        <a href=""><i className="bi bi-cup-straw"></i> Cooking's</a>
                        <a href=""><i className="bi bi-dice-5"></i> Game's</a>
                        <a href=""><i className="bi bi-suit-heart"></i> Love Story</a>
                    </SmallMenu>
                </Route>
                <Route path="/authors">
                    <SmallMenu>
                        Some authors
                    </SmallMenu>
                    
                </Route>
            </div>
        </div>
    );
}
 
export default Dashboard;