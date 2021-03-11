import './style.css';

const WrapperColor = ({children, custom_class}) => {
  return (
    <div id={'custom-border'} className={"col-md-12 col-lg-12 col-sm-12 col-xs-12 wrapper-color"}>
      {children}
    </div>
  );
}
 
export default WrapperColor;