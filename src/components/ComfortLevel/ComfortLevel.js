import React, { useContext, useState, useEffect, useCallback } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './ComfortLevel.css';

const ComfortLevel = () => {
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [animateHumidity, setAnimateHumidity] = useState(false);
    const { currently } = useContext(GlobalContext);
    let feelsLikeTemp = 0, humidityLevel = 0, uvIndexNum = 0;

    if (Object.keys(currently).length !== 0) {
        const { apparentTemperature, humidity, uvIndex } = currently;

        feelsLikeTemp = apparentTemperature;
        humidityLevel = humidity;
        uvIndexNum = uvIndex;

        setHumidityBar();
    }

    // Set humidity level by adjusting stroke properties of humidity bar svg.
    function setHumidityBar() {
        const humidityBar = document.querySelector('.humidity-bar-inner');
        const rootFontSize = parseFloat(window.getComputedStyle(document.documentElement).getPropertyValue('font-size'));
        let offset;

        // Animate humidity bar from 0 to current position if visible in viewport.
        if (animateHumidity) {
            const radius = humidityBar.r.baseVal.value;
            const circumference = Math.round(2 * Math.PI * radius);
            // Note: 3.7em added to account for humidity bar's "open ring" shape.
            offset = (circumference + 3.7*rootFontSize) - humidityLevel * circumference;
        }
        else offset = 22*rootFontSize; // Reset humidity bar when not in viewport.

        humidityBar.style.strokeDashoffset = offset;
    }

    const checkPosition = useCallback(() => {
        const humiditySvg = document.querySelector('.humidity-bar');
        const humidityPositionFromTop = humiditySvg.getBoundingClientRect().top;

        if (humidityPositionFromTop - windowHeight <= 0) setAnimateHumidity(true);
        else setAnimateHumidity(false);
    }, [windowHeight]);

    // Check whether window is resized or if user scrolls down to animate humidity bar on scroll.
    useEffect(() => {
        window.addEventListener('scroll', checkPosition);
        window.addEventListener('resize', () => setWindowHeight(window.innerHeight));

        return () => {
            window.removeEventListener('scroll', checkPosition);
            window.removeEventListener('resize', () => setWindowHeight(window.innerHeight));
        }
    }, [checkPosition]);

    return (
        <Container>
            <h2 className='widget-title'>Comfort Level</h2>
            <Row className='comfort-wrapper'>
                <Col xs={6} className='humidity flex-center'>
                    <h3 className='widget-subtitle'>Humidity</h3>
                    <div className='humidity-bar-wrapper flex-center'>
                        <svg className='humidity-bar'>
                            <circle
                                className='humidity-bar-outer'
                                r='3.5em'
                                cx='4em'
                                cy='4em' />
                            <circle
                            className='humidity-bar-inner'
                            r='3.5em'
                            cx='4em'
                            cy='4em' />
                        </svg>
                        <div className='humidity-value'>{Math.round(humidityLevel*100)}</div>
                    </div>
                    <Row>
                        <Col className='humidity-bar-level'>0</Col>
                        <Col className='humidity-bar-level'>100</Col>
                    </Row>
                </Col>
                <Col xs={6} className='comfort-info flex-center'>
                    <Row className='data_field'>
                        <Col className='data_title' xs={7} sm={6}>Feels like</Col>
                        <Col className='temp data_value' xs={5} sm={6}>{Math.round(feelsLikeTemp)}</Col>
                    </Row>
                    <Row className='data_field'>
                        <Col className='data_title' xs={7} sm={6}>UV index</Col>
                        <Col className='data_value' xs={5} sm={6}>{uvIndexNum}</Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default ComfortLevel;