import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Windmill from './Windmill';

const Wind = () => {
    const { currently, units } = useContext(GlobalContext);
    let windDirection = '', windVelocity = 0;

    if (Object.keys(currently).length !== 0) {
        const { windBearing, windSpeed} = currently;
        
        windDirection = degreesToCompass(windBearing) || 'None'; // Convert degrees to textual compass direction.
        windVelocity =  units === 'fah'? `${Math.round(windSpeed)} mph` // Imperial units: API default is miles/hour.
                        :`${Math.round(windSpeed * 3.6)} km/h` // SI units: Convert API's metres/second to kilometres/hour.
    }

    function degreesToCompass(deg) {
        let windDirections = [
            "North", "North-East", "East", "South-East", "South", "South-West", "West", "North-West"
        ];
        let bearing = Math.round(deg/45) % 8; // 8 compass directions => 45 deg per direction
        return windDirections[bearing];  
    }

    return (
        <Container>
            <h2 className='widget-title'>Wind Velocity</h2>
            <Row className='wind-wrapper'>
                <Col xs={5} sm={6} className='windmill-wrapper flex-center'>
                    <Windmill size={0.85} posX={50} />
                    <Windmill size={0.55} posX={75} />
                </Col>
                <Col xs={7} sm={6} className='wind-info flex-center'>
                    <Row>
                        <Col className='data_title' xs={5} sm={6}>Direction</Col>
                        <Col className='data_value' xs={7} sm={6}>{windDirection}</Col>
                    </Row>
                    <Row>
                        <Col className='data_title' xs={5} sm={6}>Speed</Col>
                        <Col className='data_value' xs={7} sm={6}>{windVelocity}</Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Wind;
