import React from 'react';
import CardDetails from '../CardDetails/CardDetails';
import FakeData from '../FakeData/FakeData';

const Home = () => {
    const backgroundImageStyle = {
        backgroundImage: `url('https://i.ibb.co/S0NRPMB/background.jpg')`,
        backgroundSize: 'cover', 
        height: '100vh',
        backgroundRepeat: 'no-repeat'
    }
    return (
        <div style={backgroundImageStyle} className='main-section'>
            <div className="container">
                <div className="row">
                    {
                        FakeData.map((Data)=> <CardDetails cardData={Data} ></CardDetails> )
                    }
                </div>
            </div>        
        </div>
    );
};

export default Home;