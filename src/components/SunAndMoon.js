import React, { useContext, useEffect, useState, useCallback } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Container from 'react-bootstrap/Container';
import { IconContext } from 'react-icons';
import sunUrl from '../assets/images/weather-icons/clear-day.svg';
import {
    WiMoonAltNew,
    WiMoonAltWaxingCrescent3,
    WiMoonAltFirstQuarter,
    WiMoonAltWaxingGibbous3,
    WiMoonAltFull,
    WiMoonAltWaningGibbous4,
    WiMoonAltThirdQuarter,
    WiMoonAltWaningCrescent4
} from 'react-icons/wi';

const SunAndMoon = () => {
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [animateSun, setAnimateSun] = useState(false);
    const { daily } = useContext(GlobalContext);
    let sunrise_time, sunset_time, fullDayTime, lunarPhase, lunarIcon;

    if (Object.keys(daily).length !== 0) {
        const { sunriseTime, sunsetTime, moonPhase } = daily[0];

        sunrise_time = sunriseTime;
        sunset_time = sunsetTime;
        fullDayTime = sunset_time - sunrise_time;
        lunarPhase = getLunarPhaseText(moonPhase);
    }

    // Animate sun's position/trajectory on scroll.
    useEffect(() => {
        const sunWrapper = document.querySelector('.sun-wrapper');
        const sunCurrentPath = document.querySelector('.sun-path-current');
        const timeNow = Math.floor(new Date().getTime() / 1000);
        const sunElapsedTime = timeNow - sunrise_time;
        const percent = sunElapsedTime / fullDayTime;
        const radius = sunCurrentPath.r.baseVal.value;
        const circumference = Math.round(2 * Math.PI * radius);
        let offset, degreesToRotate;

        // Fix sun's position at sunrise.
        if (timeNow < sunrise_time) {
            offset =  circumference;
            degreesToRotate = 0;
        }
        // Fix sun's position at sunset.
        else if (sunElapsedTime >= fullDayTime) {
            offset = 0.5*circumference;
            degreesToRotate = 180;
        }
        else {
            // Animate sun from sunrise to current position if visible in viewport.
            if (animateSun) {
                offset = circumference - percent * 0.5 * circumference;
                degreesToRotate = percent*180;
            }
            // Reset sun to sunrise position when not in viewport.
            else {
                offset = circumference;
                degreesToRotate = 0;
            }
        }
        sunCurrentPath.style.strokeDashoffset = offset;
        sunWrapper.style.transform = `rotate(${degreesToRotate}deg)`;

    }, [animateSun, sunrise_time, fullDayTime]);

    const checkPosition = useCallback(() => {
        const sunWrapper = document.querySelector('.sun-wrapper');
        const sunPositionFromTop = sunWrapper.getBoundingClientRect().top;

        if (sunPositionFromTop - windowHeight <= 0) setAnimateSun(true);
        else setAnimateSun(false)

    }, [windowHeight]);

    // Check whether window is resized or if user scrolls down to animate sun on scroll.
    useEffect(() => {
        window.addEventListener('scroll', checkPosition);
        window.addEventListener('resize', () => setWindowHeight(window.innerHeight));

        return () => {
            window.removeEventListener('scroll', checkPosition);
            window.removeEventListener('resize', () => setWindowHeight(window.innerHeight));
        }
    }, [checkPosition]);

    function convertTime(timeStamp) {
        const newTime = new Date(timeStamp*1000);
        const hour = newTime.getHours();
        const min = newTime.getMinutes();

        return `${hour < 10? '0'+hour : hour}:${min < 10? '0'+min : min}`;
    }

    /* Get textual moon phase and icon based on given Lunation Number.
     From Dark Sky API: 0 -> new moon, 0.25 -> first quarter moon, 0.5 -> full moon, 0.75 -> third quarter moon. */
    function getLunarPhaseText(lunationNum) {
        const lunarPhases = [
            'New Moon',
            'Waxing Crescent',
            'First Quarter',
            'Waxing Gibbous',
            'Full Moon',
            'Waning Gibbous',
            'Third Quarter',
            'Waning Crescent'
        ];

        /* Note: Phase array and Icon array items mirrored intentionally due to how icons render with color property.
           i.e. a "New Moon" icon (<WiMoonAltNew/>) renders like a "Full Moon" when its color is set to white. */
        const lunarIcons = [
            <WiMoonAltFull />,
            <WiMoonAltWaningGibbous4 />,
            <WiMoonAltThirdQuarter />,
            <WiMoonAltWaningCrescent4 />,
            <WiMoonAltNew />,
            <WiMoonAltWaxingCrescent3 />,
            <WiMoonAltFirstQuarter />,
            <WiMoonAltWaxingGibbous3 />
        ];
        const lunarIndex = lunationNum*8;

        // Check whether given lunarIndex corresponds to New/Full Moon or First/Third Quarter.
        if (lunarIndex === 0 || 8 % lunarIndex === 0 || 8 % lunarIndex === 2) {
            lunarIcon = lunarIcons[lunarIndex];
            return lunarPhases[lunarIndex];
        }

        // Determine in between ranges.
        switch(lunarIndex) {
            // Waxing Crescent
            case lunarIndex > 0 && lunarIndex < 2:
                lunarIcon = lunarIcons[1];
                return lunarPhases[1];
            // Waxing Gibbous
            case lunarIndex > 2 && lunarIndex < 4:
                lunarIcon = lunarIcons[3];
                return lunarPhases[3];
            // Waning Gibbous
            case lunarIndex > 4 && lunarIndex < 6:
                lunarIcon = lunarIcons[5];
                return lunarPhases[5];
            // Waning Crescent
            default:
                lunarIcon = lunarIcons[7];
                return lunarPhases[7];
        }
    }
    
    return (
        <Container className='sunrise-sunset-wrapper'>
            <h2 className='widget-title'>Sun & Moon</h2>
            <div className='sun-path-wrapper flex-center'>
                <svg className='sun-path'>
                    <circle
                        className='sun-path-full'
                        r='9.5em'
                        cx='10em'
                        cy='10em' />
                </svg>
                <svg className='sun-path'>
                    <circle
                        className='sun-path-current'
                        r='9.5em'
                        cx='10em'
                        cy='10em' />
                </svg>
                <div className='sun-wrapper'>
                    <img className='sun' src={sunUrl} alt='sun-icon'/>
                </div>
                <div className='sunrise-time'>{convertTime(sunrise_time)}</div>
                <div className='lunar-phase-wrapper'>
                    <IconContext.Provider value={{className: 'lunar-icon'}}>{lunarIcon}</IconContext.Provider>
                    <span>{lunarPhase}</span>
                </div>
                <div className='sunset-time'>{convertTime(sunset_time)}</div>
            </div>
        </Container>
    );
}

export default SunAndMoon;
