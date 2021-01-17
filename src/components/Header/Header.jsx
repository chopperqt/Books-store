
import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import actionsMenu from '../../redux/Menu/actions';


const Header = () => {

    const menuWidth = useSelector(state => state.menu.menuType);

    const dispath = useDispatch();

    const {
        actionOpenFullMenu
    } = actionsMenu

    function actionMenu() {
        dispath(actionOpenFullMenu(menuWidth));
    }

    return (
        <header>
            <button onClick={actionMenu} className="splitMenuBtn">
                <AnimateButton menuWidth={menuWidth} />
            </button>
        </header>
    );
}

const AnimateButton = ({menuWidth}) => {

    let className = '';
    //bi-menu-app
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
        <i class={'bi '+className}></i>
    )
}

 
export default Header;