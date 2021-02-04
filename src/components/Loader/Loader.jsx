import React from 'react';

const Loader = () => {
  return (
    <div className="col-md-12 col-sm-12 col-lg-12 col-xs-12 d-flex justify-content-center h-100 mt-5">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Loader;