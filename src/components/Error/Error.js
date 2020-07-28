import React from 'react';
import errorCloudUrl from '../../assets/images/error-cloud.png';
import './Error.css';

const Error = ({ hideError }) => {
    function handleClick() {
        document.querySelector('.error-wrapper').classList.add('hide');
        hideError();
    }

    return (
        <div className='error-wrapper flex-center'>
            <div className='error-bg'></div>
            <div className='error-cloud-wrapper flex-center'>
                <div className='error-heading'>
                    <h2>404</h2>
                    <div className='error-sign flex-center'><span>ERROR</span></div>
                </div>
                <img src={errorCloudUrl} alt='error page' />
                <p>Seems we're having trouble serving you that byte... Some placeholder weather data will be served temporarily.<br />Please try reloading in a moment for the latest updates.</p>
                <button onClick={handleClick}>okay</button>
            </div>
        </div>
    )
}

export default Error;
