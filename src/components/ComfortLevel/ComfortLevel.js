import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './ComfortLevel.css';

const ComfortLevel = () => {
    const { currently } = useContext(GlobalContext);
    let feelsLikeTemp = 0, humidityLevel = 0, uvIndexNum = 0;

    if (Object.keys(currently).length !== 0) {
        const { apparentTemperature, humidity, uvIndex } = currently;

        feelsLikeTemp = apparentTemperature;
        humidityLevel = humidity;
        uvIndexNum = uvIndex;

        setHumidityBar(humidityLevel);
    }

    // Set humidity level by adjusting stroke properties of humidity bar svg.
    function setHumidityBar(humidity) {
        const humidityBar = document.querySelector('.humidity-bar-inner');
        const radius = humidityBar.r.baseVal.value;
        const circumference = Math.round(2 * Math.PI * radius);
        const rootFontSize = parseFloat(window.getComputedStyle(document.documentElement).getPropertyValue('font-size'));
        // Note: 3.7em added to account for humidity bar's "open ring" shape.
        const offset = (circumference + 3.7*rootFontSize) - humidity * circumference;
        humidityBar.style.strokeDashoffset = offset;
    }

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