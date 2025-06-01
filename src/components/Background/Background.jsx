import React from 'react';
import truck from '../../assets/truck.mp4';
// import image1 from '../../assets/image1.png';
import image1 from '../../assets/images/featureGame1.png'
import image2 from '../../assets/images/homeScreen.png';
// import image3 from '../../assets/image3.png';
import './background.css';

const Background = ({ playStatus, heroCount }) => {
    return (
        <div className='background-container'>
            {playStatus ? (
                <video className='background' autoPlay loop muted>
                    <source src={truck} type="video/mp4" />
                </video>
            ) : heroCount === 0 ? (
                <img src={image1} className='background' alt="" />
            ) :     <img src={image2} className='background' alt="" />
             }
        </div>
    );
};

export default Background;
