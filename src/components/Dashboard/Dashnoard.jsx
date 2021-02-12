import React, {useEffect} from 'react';
import MenuAction from '../../redux/Menu/actions';
import {NavLink, Route} from 'react-router-dom'

import './style.css';
import { useDispatch, useSelector } from 'react-redux';

import {
    SmallMenu
} from '../../components';


const Dashboard = ({
    changeBookFilter,
    bestsellersCount,
    gearsCount
}) => {
    const dispath = useDispatch();

    const menuWidth = useSelector(state => state.menu.menuType);
    const cartLength = useSelector(state => state.cart.cart.length);
    const books = useSelector(state => state.books.booksItems.length);
    const authors = useSelector(state => state.authors.authors.length);

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
                <NavLink to="/home" className="g-grid justify-content-center linking" >
                    <i className="bi bi-journal" style={{fontSize: '30px'}}></i>
                    <p className="fs-6">Home</p>
                </NavLink>
                <NavLink to="/cart" className="d-grid justify-content-center linking">
                    <i className="bi bi-cart" style={{fontSize: '30px'}}></i>
                    <p className="fs-6">Cart</p>
                    {cartLength ? <span className="cartLength badge bg-danger">{cartLength}</span> : null}
                </NavLink>
                <NavLink to="/books" className="d-grid justify-content-center linking" onClick={() => dispath(actionDasboardOpen())}>
                    <i className="bi bi-book" style={{fontSize: '30px'}}></i>
                    <p className="fs-6">Books</p>
                    {books ? <span className="bookLength badge bg-primary">{books}</span> : null}
                </NavLink>
                <NavLink to="/authors" className="d-grid justify-content-center linking">
                    <i className="bi bi-people" style={{fontSize: '30px'}}></i>
                    <p className="fs-6">Authors</p>
                    {authors ? <span className="bookLength badge bg-primary">{authors}</span>: null}
                </NavLink>
            </div>
            <div className="dashboard_line"></div>
            <div className="menu__right">
                <Route path="/books">
                    <SmallMenu>
                        <div className="text-center" style={{borderBottom: '1px solid rgba(0,0,0,.125)'}}>
                            <h5 className="fs-6 text" style={{textTransform: 'uppercase'}}>Advanced menu</h5>
                        </div>
                        <p className="mb-0" onClick={() => changeBookFilter()}><i className="bi bi-book"></i> All</p>
                        <p className="mb-0" onClick={() => changeBookFilter('bestseller')}><i className="bi bi-bag"></i> Bestseller's <span className="badge badge-sm bg-primary ms-1">{bestsellersCount}</span></p>
                        <p className="mb-0"><i className="bi bi-gear"></i> Gear's <span className="badge badge-sm bg-primary ms-1">{gearsCount}</span></p>
                        <p className="mb-0"><i className="bi bi-bicycle"></i> Sport's</p>
                        <p className="mb-0"><i className="bi bi-binoculars"></i> Travel's</p>
                        <p className="mb-0"><i className="bi bi-cup-straw"></i> Cooking's</p>
                        <p className="mb-0"><i className="bi bi-dice-5"></i> Game's</p>
                        <p className="mb-0"><i className="bi bi-suit-heart"></i> Love Story</p>
                    </SmallMenu>
                </Route>
                <Route path="/book/:id">
                <SmallMenu>
                        <div className="text-center" style={{borderBottom: '1px solid rgba(0,0,0,.125)'}}>
                            <h5 className="fs-6 text" style={{textTransform: 'uppercase'}}>Advanced menu</h5>
                        </div>
                        <p className="mb-0" onClick={() => changeBookFilter()}><i className="bi bi-book"></i> All</p>
                        <p className="mb-0" onClick={() => changeBookFilter('bestseller')}><i className="bi bi-bag"></i> Bestseller's <span className="badge badge-sm bg-primary ms-1">{bestsellersCount}</span></p>
                        <p className="mb-0"><i className="bi bi-gear"></i> Gear's</p>
                        <p className="mb-0"><i className="bi bi-bicycle"></i> Sport's</p>
                        <p className="mb-0"><i className="bi bi-binoculars"></i> Travel's</p>
                        <p className="mb-0"><i className="bi bi-cup-straw"></i> Cooking's</p>
                        <p className="mb-0"><i className="bi bi-dice-5"></i> Game's</p>
                        <p className="mb-0"><i className="bi bi-suit-heart"></i> Love Story</p>
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