import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

const PriceItem = ({data}) => {
    return (
        <div style={{padding: '20px'}}>
            <div className="col-md-12 col-sm-12 col-lg-12 d-flex align-items-center justify-content-end">
                <h5 className="mb-0">{data}$</h5>
                <button type="button" className="btn btn-outline-primary ms-2">Pay</button>
            </div>
        </div>
    );
}
 
export default PriceItem;