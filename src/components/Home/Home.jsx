import './style.css';
import {
    WrapperColor
} from '../../components';

import format from 'dateformat';

const Home = () => {
    return (
        <div className="row d-grid home">
            <div className="col-3 w-100">
                <WrapperColor>
                    <div>We work scince 2010</div>
                </WrapperColor>
            </div>
            <div className="col-3 w-100">
                <WrapperColor>
                    <div>Scince 2010 we sold 12000 books</div>
                </WrapperColor>
            </div>
            <div className="col-3 w-100">
                <WrapperColor>
                    <div>We sold ~500 book every day</div>
                </WrapperColor>
            </div>
            <div className="col-3 w-100">
                <WrapperColor>
                    <div>We have 2000 book</div>
                </WrapperColor>
            </div>
        </div>
        
    );
}
 
export default Home;