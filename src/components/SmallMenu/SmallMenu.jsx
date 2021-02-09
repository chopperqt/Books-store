import './style.css';

const SmallMenu = ({children}) => {
    return (
        <div className="smallWrap">
            <div className="smallWrapMenu">
                {children}
            </div>
            <div className="text-muted fs-6 text-center h-100 d-flex justify-content-center align-items-end">
                <p className="mb-0">Create by Chopper</p>
            </div>
        </div>
    );
}
 
export default SmallMenu;