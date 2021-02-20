import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import actionsMenu from '../../redux/Menu/actions';
import { useEffect, useState } from 'react';
import actionsHeader from '../../redux/Header/actions';
import actionsBooks from '../../redux/Books/actions';
import actionsCart from '../../redux/Cart/actions';
import {Button,Popover, PopoverHeader, PopoverBody, UncontrolledPopover} from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import {
    SearchItem
} from '../../components'


const Header = ({
    cart,
    searchBook,
    priceStore
}) => {

    const menuWidth = useSelector(state => state.menu.menuType);
    const cartStore = useSelector(state => state.cart.cart);
    const cartSelected = useSelector(state => state.cart.cartSelected);
    const cartLength = cartStore.length;
    const [fullScreen,setFullscreen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [popup, setPopup] = useState(false);
    const [sumPrices, setSumPrices] = useState(0);

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
        actionRemoveBookFromCart,
        actionRemoveSelected,
    } = actionsCart

    function actionMenu() {
        dispath(actionOpenFullMenu(menuWidth));
    }

    const searching = () => {
        dispath(actionSearchBookData(searchValue))
    }

    const clearSearchValue = () => {
        setSearchValue('');
    }
    
    useEffect(() => {
        let elem = document.querySelector('.search-input');

        searching();
        searchValue.length > 0 ? setPopup(true) : setPopup(false)
    }, [searchValue])

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

    useEffect(() => {
        setSumPrices(0);

        cart.map(item => {
            setSumPrices(prev => prev + item.book_price)
        });
    },[cart])

    function actionFullScreen() {
        console.log(fullScreen)
        if (!fullScreen) { 
            document.documentElement.requestFullscreen()
        }else {
            document.exitFullscreen() 
        }
    }

    function removeFromCart(id,price) {
        dispath(actionRemoveBookFromCart(id))
        if (cartSelected.filter(item => item === id).length !== 0) {
            dispath(actionRemoveSelected(id, price))
          }
    }

    return (
        <header>
            <div className="col-md-12 h-100 d-flex align-items-md-center d-flex justify-content-around">
                <div className="col-md-6">
                    {/* <button onClick={actionMenu} className="splitMenuBtn">
                        <AnimateButton menuWidth={menuWidth} />
                    </button> */}
                </div>
                <div className="col-md-4 d-flex justify-content-end align-items-baseline">
                    <span className="popup-item">
                        <button className="fillSizeBtn" id="PopoverFocus">
                            {cartLength ? <span className="cartLength badge bg-danger cartL">{cartLength}</span> : null}
                            <i className="bi bi-cart"></i>
                        </button>
                        <UncontrolledPopover trigger="legacy" placement="bottom" target="PopoverFocus">
                            <PopoverHeader className="d-flex" style={{justifyContent: 'space-between',width: '274px'}}>Cart</PopoverHeader>
                            <PopoverBody style={{width: '275px', maxHeight: "300px",overflow: "auto"}}>{cartStore.length ? cartStore.map(item => (
                                <div key={item._id} className="col-md-12 d-flex miniCart">
                                    <img src={item.book_picture} alt="" className="col-md-3"/>
                                    <div className="col-md-8" style={{marginLeft: '2px'}}>
                                        <Link to={'/book/'+item._id}>
                                            <h5 className="fs-6 text">{item.book_name}</h5>
                                        </Link>
                                        <p className="text-muted" style={{fontSize: '15px'}}>{item.book_price}$</p>
                                    </div>
                                    <i onClick={() => removeFromCart(item._id,item.book_price)}  className="bi bi-x-circle col-md-1"></i>
                                </div>
                            )): <p className="text-muted mt-4">Add book to cart</p>}
                            
                            </PopoverBody>
                            <PopoverHeader>
                                <div className="col-md-12 col-sm-12 col-lg-12 col-xs-12 d-flex justify-content-end align-items-center">
                                    <p className="text-muted mb-0" style={{marginRight: "10px"}}>Amount: {priceStore}$</p>
                                    <NavLink to={"/cart"} style={{outline: 'none', border: 'none'}}>
                                        <button className="btn-sm btn-outline-primary">В корзину</button>
                                    </NavLink>
                                </div>
                            </PopoverHeader>
                        </UncontrolledPopover>
                    </span>
                    <button  onClick={actionFullScreen} data-toggle-fullscreen="false"  className="fillSizeBtn">
                        <i className="bi bi-arrows-fullscreen"></i>
                    </button>
                    <div className="input-group col-md-7 col-sm-12 col-lg-7">
                        <input onChange={e => setSearchValue(e.target.value)} type="text" placeholder="Write search text" value={searchValue} className="form-control search-input" aria-label="Recipient's username" aria-describedby="button-addon2" />
                        <div className="popup-div" id="popup-div" style={popup ? {display: "block"} : {display: 'none'}}>
                            <PopoverHeader>
                                <p className="text-muted mb-0">Search</p>
                            </PopoverHeader>
                            <PopoverBody>
                                {
                                    searchValue.length !== 0 ?
                                        searchBook !== false ? searchBook.map(item => <SearchItem clearValue={() => clearSearchValue()} cartStore={cart} key={item._id} data={item} />)
                                        : <p className="text mb-0">Nothing found!</p>
                                    : <p>Nothing found!</p>
                                }
                            </PopoverBody>
                        </div>
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