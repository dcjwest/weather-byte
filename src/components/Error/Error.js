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
                <img src={errorCloudUrl} alt='error page' />
                <p>Seems we're having trouble serving you that byte.</p>
                <p>Please try reloading in a moment.</p>
                <button onClick={handleClick}>okay</button>
            </div>
        </div>
    )
}

export default Error;
