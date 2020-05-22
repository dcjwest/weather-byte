import React, { useState } from 'react';
import cloudUrl from '../../assets/images/loader/cloud.svg';
import cloudBiteUrl from '../../assets/images/loader/cloud-bite.svg';
import cloudBg1 from '../../assets/images/loader/cloud_bg1.png';
import cloudBg2 from '../../assets/images/loader/cloud_bg2.png';
import cloudBg3 from '../../assets/images/loader/cloud_bg3.png';
import cloudBg4 from '../../assets/images/loader/cloud_bg4.png';
import cloudBg5 from '../../assets/images/loader/cloud_bg5.png';
import './Loader.css';

const Loader = ({ appLoaded, showError }) => {
    const [loaderComplete, setLoaderComplete] = useState(false);

    // Trigger hiding of loader screen once animation is complete and API requests are handled.
    setTimeout(() => {
        if (appLoaded || showError) {
            document.querySelector('.App').classList.add('show');
            setLoaderComplete(true);
        } 
    }, 5000);

    return (
        <div className={`loader flex-center ${appLoaded && loaderComplete? 'hide':''}`}>
            <div className='cloud-wrapper flex-center'>
                <img className='cloud' src={cloudUrl} alt='cloud' />
                <img className='cloud-bite' src={cloudBiteUrl} alt='cloud' />
                <div className='cloud-shadow'></div>
                <div className='cloud-banner'>
                    <img src={cloudBg1} alt='' />
                    <img src={cloudBg2} alt='' />
                    <img src={cloudBg3} alt='' />
                    <img src={cloudBg4} alt='' />
                    <img src={cloudBg5} alt='' />
                </div>
            </div>
            <h6 className='app-name'>Weather-Byte</h6>
        </div>
    );
}

export default Loader;
