import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

const PriceItem = ({data}) => {
    //React Store
    const [sumPrices, setSumPrices] = useState(0);

    useEffect(() => {
        setSumPrices(0)

        data.map(item => {
            setSumPrices(prev => prev + item.book_price);
        })
    },[data])

    return (
        <div style={{padding: '20px'}}>
            {sumPrices}
        </div>
    );
}
 
export default PriceItem;