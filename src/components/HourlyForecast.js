import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Swiper from 'react-id-swiper';
import { IconContext } from 'react-icons';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

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
            let currentHour = new Date(hourItem.time*1000).getHours();
            let icon = hourItem.icon;
            // API doesn't differentiate between cloudy day/night, so it is checked here.
            if (icon === 'cloudy') {
                if (currentHour >= 18 || currentHour <= 7) icon = 'cloudy-night';
                else icon = 'cloudy-day';
            }

            return (
                <div key={index} className='hourly-slide flex-center'>
                    <span className='slide-time'>{convertUnixTime(hourItem.time).hour}</span>
                    <img className='slide-icon' src={getWeatherIcon(icon)} alt={hourItem.summary} title={hourItem.summary} />
                    <span className='slide-temp'>{Math.round(hourItem.temperature)}</span>
                </div>
            );
        });
    }

    return (
        <div className='hourly-forecast-swiper flex-center'>
            <IconContext.Provider value={{className: 'swiper-icon'}}><IoIosArrowBack /></IconContext.Provider>
            <Swiper {...params}>
                { hourCarousel}
            </Swiper>
            <IconContext.Provider value={{className: 'swiper-icon'}}><IoIosArrowForward /></IconContext.Provider>
        </div>
    );
}

export default HourlyForecast;
