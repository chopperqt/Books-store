import './style.css';

const SmallMenu = ({children}) => {
    return (
        <div className="smallWrap">
            <div className="smallWrapMenu">
                {children}
            </div>
            <div className="text-muted fs-6 text-center">
                <p>Create by Chopper</p>
            </div>
        </div>
    );
}
 
export default SmallMenu;