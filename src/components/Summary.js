import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Container from 'react-bootstrap/Container';
import { IconContext } from 'react-icons';
import { MdLocationOn } from 'react-icons/md';
import darkSkyIconUrl from '../assets/images/darksky-icon.png';

const Summary = ({ currentLocation, updateTime }) => {
    const { currently, daily } = useContext(GlobalContext);
    let currentTemp, currentMin, currentMax, currentSummary;

    if (Object.keys(currently).length !== 0 && daily.length !== 0) {
        const { temperature, summary } = currently;
        const { temperatureMin, temperatureMax } = daily[0];
        
        currentTemp = Math.round(temperature);
        currentMin = Math.round(temperatureMin);
        currentMax = Math.round(temperatureMax);
        currentSummary = summary;
    }

    return (
        <Container className='summary-wrapper flex-center'>
            <Container className='flex-center'>
                <div className='location'>{currentLocation}</div>
                <button className='location-btn'>
                    <IconContext.Provider value={{className: 'icon location-icon'}}>
                        <MdLocationOn />
                    </IconContext.Provider>
                </button>
            </Container>
            <div className="current-temp flex-center">
                <span className='current-temp-val'>{currentTemp}</span>
                <span className='current-temp-deg'>&deg;</span>
            </div>
            <div className='current-maxmin'>
                <span className='max'>{currentMax}</span>
                <span className='min'>{currentMin}</span>
            </div>
            <div className='current-condition'>{currentSummary}</div>
            <div className='api-update-wrapper flex-center'>
                <a href='https://darksky.net/poweredby/'
                    className='darksky-link' 
                    target='_blank' 
                    rel='noopener noreferrer'
                    title='Dark Sky API'>
                    <img className='darksky-img' src={darkSkyIconUrl} alt='Dark Sky icon' />Powered by Dark Sky
                </a>
                <span className='last-update'>{updateTime}</span>
            </div>
        </Container>
    );
}

export default Summary;
