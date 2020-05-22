import React from 'react';
import './Windmill.css';

const Windmill = ({ size, posX }) => {
    return (
        <div className='windmill' style={{fontSize: `${size}em`, left: `${posX}%`}}>
            <div className='base'></div>
            <div className='rotor'></div>
            <div className='blades'>
                <div className='blade'></div>
                <div className='blade'></div>
                <div className='blade'></div>
            </div>
        </div>
    );
}

export default Windmill;
