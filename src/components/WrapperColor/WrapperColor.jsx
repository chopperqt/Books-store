import './style.css';

const WrapperColor = ({children}) => {
  return (
    <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 wrapper-color">
      {children}
    </div>
  );
}
 
export default WrapperColor;