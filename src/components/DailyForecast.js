import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const DailyForecast = ({ convertUnixTime, getWeatherIcon }) => {
    const { daily } = useContext(GlobalContext);
    let dailyForecastList = [];

    if (Object.keys(daily).length !== 0) {
        dailyForecastList = daily.map((dayItem, index) => {

            if (index === 0) return null; // Skip over first item which represents today.
            let nextDayInfo = convertUnixTime(dayItem.time);
            if (index === 1) nextDayInfo.day = 'Tomorrow';

            return (
                <Row key={index} className='daily-row'>
                    <Col className='daily-date flex-center' xs={6} sm={4}>
                        <span>{`${nextDayInfo.day}, ${nextDayInfo.date} ${nextDayInfo.month}`}</span>
                    </Col>
                    <Col className='daily-icon flex-center' xs={2} sm={4}>
                        <img src={getWeatherIcon(dayItem.icon)} alt={dayItem.summary} title={dayItem.summary} />
                    </Col>
                    <Col className='daily-temps flex-center' xs={4} sm={4}>
                        <span className='max'>{Math.round(dayItem.temperatureMax)}</span>
                        <span className='min'>{Math.round(dayItem.temperatureMin)}</span>
                    </Col>
                </Row>
            );
        });
    }

    return (
        <Container className='daily-forecast-wrapper'>
            {dailyForecastList}
        </Container>
    );
}

export default DailyForecast;