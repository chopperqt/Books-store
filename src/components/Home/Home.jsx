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
                    <div className='p-4 text-center'>
                        <h3>We work scince</h3> 
                        <h1 className="fs-1 text-success">2010</h1>
                    </div>
                </WrapperColor>
                <WrapperColor>
                    <div className="p-4 text-center">
                        <h1 className="text-success">~800</h1>
                        <h3>people per day</h3>
                    </div>
                </WrapperColor>
            </div>
            <div className="col-3 w-100">
                <WrapperColor>
                    <div className="p-4 text-center">
                        <h3>Scince 2010 we sold</h3>
                        <h1 className="text-warning">15000</h1>
                        <h3>books</h3>
                    </div>
                </WrapperColor>
            </div>
            <div className="col-3 w-100">
                <WrapperColor>
                    <div className="p-4 text-center">
                        <h3>We sold</h3>
                        <h1 className="text-danger">500-1000</h1>
                        <h3>book every day</h3>
                    </div>
                </WrapperColor>
            </div>
            <div className="col-3 w-100">
                <WrapperColor>
                    <div className="p-4 text-center">
                        <h1 className="text-success">~10000</h1>
                        <h3>people per week</h3>
                    </div>
                </WrapperColor>
            </div>
        </div>
        
    );
}
 
export default Home;