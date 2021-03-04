import React, {useEffect, useState} from 'react';
import MenuAction from '../../redux/Menu/actions';
import {NavLink, Route} from 'react-router-dom'

//api
import {
    getTotalBooks
} from '../../api/fetchBooks'
import {
    getTotalAuthors
} from '../../api/fetchAuthors'

import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import {
    Tooltip
} from 'reactstrap';

import {
    SmallMenu
} from '../../components';
import { Nav } from 'reactstrap';


const Dashboard = ({
    changeBookFilter,
    bestsellersCount,
    gearsCount
}) => {
    const dispath = useDispatch();

    const menuWidth = useSelector(state => state.menu.menuType);
    const cartLength = useSelector(state => state.cart.cart.length);
    const books = useSelector(state => state.books.booksItems.length);
    const booksStore = useSelector(state => state.books.booksItems);
    const authors = useSelector(state => state.authors.authors.length);
    const menuBtnVision = useSelector(state => state.menu.historyType);
    const totalBooks = useSelector(state => state.books.totalBooks);
    const totalAuthors = useSelector(state => state.authors.totalAuthors)

    //advanced menu
    const [booksGear, setBooksGear] = useState(0);
    const [booksSport, setBooksSport] = useState(0);
    const [booksTravel, setBooksTravel] = useState(0);
    const [booksCookign, setBooksCooking] = useState(0);
    const [booksGame, setBooksGame] = useState(0);
    const [booksLoveStory, setBooksLoveStory] = useState(0);

    //tooltips
    const [tooltipOpen, setTooltionOpen] = useState(false);
    const [tooltipTwoOpen, setTooltopTwoOpen] = useState(false);

    const tooltipToggle = () => setTooltionOpen(!tooltipOpen);
    const tooltipTwoToggle = () => setTooltopTwoOpen(!tooltipTwoOpen);

    //dashboard menu
    const [nameBtn, setNameBtn] = useState("");

    const styless = {
        width: menuWidth === 0 ? '50px' : '280px',
        transition: '.15s ease-in-out'
    }
    
    const {
        actionInitialMenu,
        actionDasboardOpen,
        actionOpenFullMenu
    } = MenuAction;

    useEffect(() => {
        if (booksStore.length !== 0) {
            setBooksGear(booksStore.filter(book => book.book_genres.gear === true).length);
            setBooksSport(booksStore.filter(book => book.book_genres.sport === true).length);
            setBooksTravel(booksStore.filter(book => book.book_genres.travel === true).length);
            setBooksCooking(booksStore.filter(book => book.book_genres.cooking === true).length);
            setBooksGame(booksStore.filter(book => book.book_genres.game === true).length);
            setBooksLoveStory(booksStore.filter(book => book.book_genres.loveStory === true).length);
        } 
    }, [booksStore]);

    useEffect(() => {
        const btn = document.querySelector('.menu-btn');
        if (menuWidth == 0) {
            setNameBtn("bi bi-arrow-bar-right")
            btn.style.left = "10px";
            btn.style.transition = ".15s ease-in-out";
        }else {
            setNameBtn("bi bi-arrow-bar-left")
            btn.style.left = "85%";
            btn.style.transition = ".15s ease-in-out";
        }
    }, [menuWidth])

    useEffect(() => {
        dispath(actionInitialMenu())
        getTotalBooks('http://localhost:8181/books/total', dispath)
        getTotalAuthors('http://localhost:8181/authors/total', dispath)
    }, [])

    const clickMenuBtn = () => {
        if (menuWidth === 0) {
            dispath(actionOpenFullMenu(1)); 
        }else {
            dispath(actionOpenFullMenu(0));
        }
    }
    
    return (
        <div className="dashboard" style={styless}>
            <div className="menu__left">
                <div className="d-grid justify-content-center">
                    <button className="menu-btn" onClick={clickMenuBtn} style={{display: menuBtnVision ? 'block' : 'none'}}>
                        <i className={nameBtn}></i>
                    </button>
                </div>
                <div className="d-grid justify-content-center">
                    <NavLink to="/" exact className="g-grid justify-content-center linking" >
                        <i className="bi bi-journal pb-2" style={{fontSize: '30px'}}></i>
                    </NavLink>
                    <NavLink to="/cart" className="d-grid justify-content-center linking">
                        <i className="bi bi-cart pb-2" style={{fontSize: '30px'}}></i>
                        {cartLength ? <span className="cartLength badge bg-danger">{cartLength}</span> : null}
                    </NavLink>
                    <NavLink to="/books" id="Tooltip-books" className="d-grid justify-content-center linking">
                        <i className="bi bi-book pb-2" style={{fontSize: '30px'}}></i>
                        <Tooltip arrowClassName={"tooltip-arrow"}  placement="right" isOpen={tooltipOpen} target={"Tooltip-books"}  toggle={tooltipToggle}>
                            <p className="mb-0" style={{fontSize: '14px'}}>Total number of books: {totalBooks}</p>
                        </Tooltip>
                    </NavLink>
                    <NavLink to="/authors" id="Tooltip-authors" className="d-grid justify-content-center linking">
                        <i className="bi bi-people" style={{fontSize: '30px'}}></i>
                        <Tooltip arrowClassName={"tooltip-arrow"}  placement="left" isOpen={tooltipTwoOpen} target={"Tooltip-authors"}  toggle={tooltipTwoToggle}>
                        <p className="mb-0" style={{fontSize: '14px'}}>Total number of authors: {totalAuthors}</p>
                        </Tooltip>
                    </NavLink>
                </div>
                <div>

                </div>
            </div>
            <div className="dashboard_line"></div>
            <div className="menu__right">
                <Route path="/books">
                    <SmallMenu>
                        <div className="text-center" style={{borderBottom: '1px solid rgba(0,0,0,.125)'}}>
                            <h5 className="fs-6 text" style={{textTransform: 'uppercase'}}>Advanced menu</h5>
                        </div>
                        <NavLink to="/books/" exact>
                            <p className="mb-0"><i className="bi bi-book"></i> All</p>
                        </NavLink>
                        <NavLink to="/books/Bestseller">
                            <p className="mb-0"><i className="bi bi-bag"></i> Bestseller's <span className="badge badge-sm bg-primary ms-1">{bestsellersCount}</span></p>
                        </NavLink>
                        <NavLink to="/books/Gear">
                            <p className="mb-0"><i className="bi bi-gear"></i> Gear's <span className="badge badge-sm bg-primary ms-1">{booksGear}</span></p>
                        </NavLink>
                        <NavLink to="/books/Sport">
                            <p className="mb-0"><i className="bi bi-bicycle"></i> Sport's <span className="badge badge-sm bg-primary ms-1">{booksSport}</span></p>
                        </NavLink>
                        <NavLink to="/books/Travel">
                            <p className="mb-0" ><i className="bi bi-binoculars"></i> Travel's <span className="badge badge-sm bg-primary ms-1">{booksTravel}</span></p>
                        </NavLink>
                        <NavLink to="/books/Cooking">
                            <p className="mb-0" ><i className="bi bi-cup-straw"></i> Cooking's <span className="badge badge-sm bg-primary ms-1">{booksCookign}</span></p>
                        </NavLink>
                        <NavLink to="/books/Game">
                            <p className="mb-0" ><i className="bi bi-dice-5"></i> Game's <span className="badge badge-sm bg-primary ms-1">{booksGame}</span></p>
                        </NavLink>
                        <NavLink to="/books/Love-Story">
                            <p className="mb-0" ><i className="bi bi-suit-heart"></i> Love Story <span className="badge badge-sm bg-primary ms-1">{booksLoveStory}</span></p>
                        </NavLink>
                    </SmallMenu>
                </Route>
                <Route path="/book/:id">
                    <SmallMenu>
                        <div className="text-center" style={{borderBottom: '1px solid rgba(0,0,0,.125)'}}>
                            <h5 className="fs-6 text" style={{textTransform: 'uppercase'}}>Advanced menu</h5>
                        </div>
                        <NavLink to="/books/">
                            <p className="mb-0"><i className="bi bi-book"></i> All</p>
                        </NavLink>
                        <NavLink to="/books/Bestseller">
                            <p className="mb-0"><i className="bi bi-bag"></i> Bestseller's <span className="badge badge-sm bg-primary ms-1">{bestsellersCount}</span></p>
                        </NavLink>
                        <NavLink to="/books/Gear">
                            <p className="mb-0"><i className="bi bi-gear"></i> Gear's <span className="badge badge-sm bg-primary ms-1">{booksGear}</span></p>
                        </NavLink>
                        <NavLink to="/books/Sport">
                            <p className="mb-0"><i className="bi bi-bicycle"></i> Sport's <span className="badge badge-sm bg-primary ms-1">{booksSport}</span></p>
                        </NavLink>
                        <NavLink to="/books/Travel">
                            <p className="mb-0" ><i className="bi bi-binoculars"></i> Travel's <span className="badge badge-sm bg-primary ms-1">{booksTravel}</span></p>
                        </NavLink>
                        <NavLink to="/books/Cooking">
                            <p className="mb-0" ><i className="bi bi-cup-straw"></i> Cooking's <span className="badge badge-sm bg-primary ms-1">{booksCookign}</span></p>
                        </NavLink>
                        <NavLink to="/books/Game">
                            <p className="mb-0" ><i className="bi bi-dice-5"></i> Game's <span className="badge badge-sm bg-primary ms-1">{booksGame}</span></p>
                        </NavLink>
                        <NavLink to="/books/Love-Story">
                            <p className="mb-0" ><i className="bi bi-suit-heart"></i> Love Story <span className="badge badge-sm bg-primary ms-1">{booksLoveStory}</span></p>
                        </NavLink>
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