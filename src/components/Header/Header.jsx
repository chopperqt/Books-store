import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import actionsMenu from '../../redux/Menu/actions';
import { useEffect, useState } from 'react';
import actionsHeader from '../../redux/Header/actions';
import actionsBooks from '../../redux/Books/actions';
import actionsCart from '../../redux/Cart/actions';
import {Button,Popover, PopoverHeader, PopoverBody} from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';


const Header = () => {

    const menuWidth = useSelector(state => state.menu.menuType);
    const cartStore = useSelector(state => state.cart.cart);
    const cartLength = cartStore.length;
    const [fullScreen,setFullscreen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [popup, setPopup] = useState(false)

    const toggle = () => {
        setPopup(prev => !prev);
    }

    const dispath = useDispatch();
    
    //actions
    const {
        actionOpenFullMenu
    } = actionsMenu;
    const {
        actionHeaderFullScreen,
    } = actionsHeader;
    const {
        actionSearchBookData
    } = actionsBooks
    const {
        actionRemoveBookFromCart
    } = actionsCart

    function actionMenu() {
        dispath(actionOpenFullMenu(menuWidth));
    }

    const searching = () => {
        dispath(actionSearchBookData(searchValue))
    }




    useEffect(() => {
        document.addEventListener('fullscreenchange', event => {
            if (document.fullscreenElement) {
                setFullscreen(prev => !prev)
            }else {
                setFullscreen(prev => !prev)
            }
        })

        // return (() => {
        //     document.removeEventListener('fullscreenchange')
        // })

    }, [])


    function actionFullScreen() {
        console.log(fullScreen)
        if (!fullScreen) { 
            document.documentElement.requestFullscreen()
        }else {
            document.exitFullscreen() 
        }
    }

    function removeFromCart(id) {
        dispath(actionRemoveBookFromCart(id))
    }

    return (
        <header>
            <div className="col-md-12 h-100 d-flex align-items-md-center d-flex justify-content-around">
                <div className="col-md-6">
                    <button onClick={actionMenu} className="splitMenuBtn">
                        <AnimateButton menuWidth={menuWidth} />
                    </button>
                </div>
                <div className="col-md-4 d-flex justify-content-end">
                    
                    <span className="popup-item">
                        <button onClick={toggle} className="fillSizeBtn">
                            {cartLength ? <span className="cartLength badge bg-danger cartL">{cartLength}</span> : null}
                            <i className="bi bi-cart"></i>
                        </button>
                        <div className="popup-div" style={popup ? {display: 'block'} : {display: 'none'}}>
                            <div className="delta"></div>
                            <PopoverHeader className="d-flex" style={{justifyContent: 'space-between',position: 'fixed',zIndex: '99',width: '298px'}}>Cart <i onClick={toggle} className="bi bi-x-circle rever"></i></PopoverHeader>
                            <PopoverBody style={{marginTop: "20px"}}>{cartStore.length ? cartStore.map(item => (
                                <div key={item._id} className="col-md-12 d-flex miniCart">
                                    <img src={item.book_picture} alt="" className="col-md-3"/>
                                    <div className="col-md-8" style={{marginLeft: '2px'}}>
                                        <Link to={'/book/'+item._id}>
                                            <h5 className="fs-6 text">{item.book_name}</h5>
                                        </Link>
                                        <p className="text-muted" style={{fontSize: '15px'}}>{item.book_price}$</p>
                                    </div>
                                    <i onClick={() => removeFromCart(item._id)}  className="bi bi-x-circle col-md-1"></i>
                                </div>
                            )): <p className="text-muted mt-4">Add book to cart</p>}</PopoverBody>
                        </div>
                    </span>
                    <button  onClick={actionFullScreen} data-toggle-fullscreen="false"  className="fillSizeBtn">
                        <i className="bi bi-arrows-fullscreen"></i>
                    </button>
                    <div className="input-group">
                        <input onChange={e => setSearchValue(e.target.value)} type="text" className="form-control" aria-label="Recipient's username" aria-describedby="button-addon2" />
                        <button onClick={searching} className="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
                    </div>
                </div>
            </div>
        </header>
    );
}

const AnimateButton = ({menuWidth}) => {
    let className = '';
    if (menuWidth === 1) {
        className = 'bi-menu-app'
    }else {
        if (menuWidth === 2) {
            className = 'bi-menu-button'
        }else {
            className = 'bi-menu-button-wide'
        }
    }
    return (
        <i className={'bi '+className}></i>
    )
}

 
export default Header;