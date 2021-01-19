import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import actionsMenu from '../../redux/Menu/actions';
import { useEffect, useState } from 'react';
import actionsHeader from '../../redux/Header/actions';


const Header = () => {

    const menuWidth = useSelector(state => state.menu.menuType);
    const [fullScreen,setFullscreen] = useState(false);

    const dispath = useDispatch();

    const {
        actionOpenFullMenu
    } = actionsMenu;
    const {
        actionHeaderFullScreen,
    } = actionsHeader;

    function actionMenu() {
        dispath(actionOpenFullMenu(menuWidth));
    }

    useEffect(() => {
        document.addEventListener('fullscreenchange', event => {
            if (document.fullscreenElement) {
                setFullscreen(prev => !prev)
            }else {
                setFullscreen(prev => !prev)
            }
        })

        return (() => {
            document.removeEventListener('fullscreenchange')
        })
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
            <div className="col-md-12 h-100 d-flex align-items-md-center">
                <div className="row" style={{marginLeft: '5px'}}>
                    <button onClick={actionMenu} className="splitMenuBtn">
                        <AnimateButton menuWidth={menuWidth} />
                    </button>
                    <button onClick={actionFullScreen} data-toggle-fullscreen="false"  className="fillSizeBtn">
                        <i className="bi bi-arrows-fullscreen"></i>
                    </button>
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