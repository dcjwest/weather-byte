import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Swiper from 'react-id-swiper';

const HourlyForecast = ({ convertUnixTime, getWeatherIcon }) => {
    // Swiper Parameters
    const params = {
        slidesPerView: 6,
        spaceBetween: 5,
        freeMode: true,
        grabCursor: true,
        navigation: {
            nextEl: '.swiper-button-next.hourCarousel',
            prevEl: '.swiper-button-prev.hourCarousel',
        },
    };
    const { hourly } = useContext(GlobalContext);
    // Initialise hourCarousel with placeholder markup to ensure Swiper configures correctly.
    let hourCarousel = [...Array(24).keys()]
        .map(x => ++x)
        .map((item, index) => {
            return (
                <div key={index} className="hourly-slide flex-center">
                    <span className="swiper-placeholder">hour {item}</span>
                    <span className="swiper-placeholder">icon {item}</span>
                    <span className="swiper-placeholder">temp {item}</span>
                </div>
            );
        });

    if (Object.keys(hourly).length !== 0) {
        hourCarousel = hourly.map((hourItem, index) => {
            let currentHour = new Date(hourItem.time * 1000).getHours();
            let icon = hourItem.icon;
            // API doesn't differentiate between cloudy day/night, so it is checked here.
            if (icon === 'cloudy') {
                if (currentHour >= 18 || currentHour <= 7)
                    icon = 'cloudy-night';
                else icon = 'cloudy-day';
            }
            // Determine the percentage chance of rain.
            let rainPercentage = (hourItem.precipProbability * 100).toFixed(0);

            return (
                <div key={index} className="hourly-slide flex-center">
                    <span className="slide-time">
                        {index === 0
                            ? 'Now'
                            : convertUnixTime(hourItem.time).hour}
                    </span>
                    <span
                        className={`slide-rain ${
                            rainPercentage < 30 ? 'hide' : ''
                        }`}
                    >
                        {`${rainPercentage}%`}
                    </span>
                    <img
                        className="slide-icon"
                        src={getWeatherIcon(icon)}
                        alt={hourItem.summary}
                        title={hourItem.summary}
                    />
                    <span className="slide-temp">
                        {Math.round(hourItem.temperature)}
                    </span>
                </div>
            );
        });
    }

    return (
        <div className="hourly-forecast-swiper flex-center">
            <Swiper {...params}>{hourCarousel}</Swiper>
        </div>
    );
};

export default HourlyForecast;
