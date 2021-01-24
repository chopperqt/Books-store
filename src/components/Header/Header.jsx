import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import actionsMenu from '../../redux/Menu/actions';
import { useEffect, useState } from 'react';
import actionsHeader from '../../redux/Header/actions';
import actionsBooks from '../../redux/Books/actions';
import {Button,Popover, PopoverHeader, PopoverBody} from 'reactstrap';


const Header = () => {

    const menuWidth = useSelector(state => state.menu.menuType);
    const [fullScreen,setFullscreen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [popup, setPopup] = useState(false)

    const toggle = () => {
        setPopup(prev => !prev);
    }

    const dispath = useDispatch();

    const {
        actionOpenFullMenu
    } = actionsMenu;
    const {
        actionHeaderFullScreen,
    } = actionsHeader;
    const {
        actionSearchBookData
    } = actionsBooks

    function actionMenu() {
        dispath(actionOpenFullMenu(menuWidth));
    }

    const searching = () => {
        console.log(searchValue)
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

    return (
        <header>
            <div className="col-md-12 h-100 d-flex align-items-md-center d-flex justify-content-around">
                <div className="col-md-8">
                    <button onClick={actionMenu} className="splitMenuBtn">
                        <AnimateButton menuWidth={menuWidth} />
                    </button>
                    <button  onClick={actionFullScreen} data-toggle-fullscreen="false"  className="fillSizeBtn">
                        <i className="bi bi-arrows-fullscreen"></i>
                    </button>
                    <span className="popup-item">
                        <button onClick={toggle} className="fillSizeBtn">
                            <i className="bi bi-cart-plus"></i>
                        </button>
                        <div className="popup-div" style={popup ? {display: 'block'} : {display: 'none'}}>
                            <div className="delta"></div>
                            <PopoverHeader>Cart</PopoverHeader>
                            <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
                        </div>
                    </span>
                </div>
                <div className="col-md-2">
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