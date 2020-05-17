import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Swiper from 'react-id-swiper';

const HourlyForecast = ({ convertUnixTime, getWeatherIcon }) => {
    // Swiper Parameters
    const params = {
        slidesPerView: 6,
        spaceBetween: 5,
        freeMode: true,
        grabCursor: true
    }
    const { hourly } = useContext(GlobalContext);
    // Initialise hourCarousel with placeholder markup to ensure Swiper configures correctly.
    let hourCarousel = [...Array(24).keys()].map(x => ++x).map((item, index) => {
        return (
            <div key={index} className='hourly-slide flex-center'>
                <span className='swiper-placeholder'>hour {item}</span>
                <span className='swiper-placeholder'>icon {item}</span>
                <span className='swiper-placeholder'>temp {item}</span>
            </div>
        );
    });

    if (Object.keys(hourly).length !== 0) {
        hourCarousel = hourly.map((hourItem, index) => {
            return (
                <div key={index} className='hourly-slide flex-center'>
                    <span className='slide-time'>{convertUnixTime(hourItem.time).hour}</span>
                    <img className='slide-icon' src={getWeatherIcon(hourItem.icon)} alt={hourItem.summary} title={hourItem.summary} />
                    <span className='slide-temp'>{Math.round(hourItem.temperature)}</span>
                </div>
            );
        });
    }

    return (
        <div className='hourly-forecast-swiper flex-center'>
            <Swiper {...params}>
                { hourCarousel}
            </Swiper>
        </div>
    );
}

export default HourlyForecast;
