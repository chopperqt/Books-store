import React from 'react';
import './style.css';

const Loader = ({height}) => {
  return (
    <div className={"col-12 w-100 loader "+height ? "h-"+height : null} style={{width: "100%"}} id="loader">
      <div className="col-md-12 col-sm-12 col-lg-12 col-xs-12 d-flex justify-content-center mt-5 mb-5">
        <div className="spinner-border col-md-12 col-sm-12 col-lg-12 col-xs-12" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
}

export default Loader;