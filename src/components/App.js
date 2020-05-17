import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Container from 'react-bootstrap/Container';
import Loader from './Loader';
import Summary from './Summary';
import HourlyForecast from './HourlyForecast';
import DailyForecast from './DailyForecast';
import ComfortLevel from './ComfortLevel';
import Wind from './Wind';
import SunAndMoon from './SunAndMoon';
import Footer from './Footer';
import iconList from '../assets/iconIndex';
import './App.css';

const App = () => {
  const [appLoaded, setAppLoaded] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const [updateTime, setUpdateTime] = useState('');
  const { setInitialWeather } = useContext(GlobalContext);

  // Request geolocation to determine user's current position.
  function getUserPosition() {
    let userLatitude, userLongitude;
    // Create Promise to handle user's response before making API call.
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          userLatitude = position.coords.latitude;
          userLongitude = position.coords.longitude;
          resolve({ userLatitude, userLongitude });
          // Note: getCurrentPosition takes an error-handling callback as 2nd argument, therefore apply REJECT here.
        }, err => reject(err));
      }
    });
  }

  // Code below run only on-mount to determine user's location and weather data.
  useEffect(() => {
    async function getInitialWeatherData() {
      const DEFAULT_LATITUDE = -33.934444, DEFAULT_LONGITUDE = 18.869167;  // Stellenbosch set as default.
      let lat, long;

      // Set user's coordinates if provided.
      try {
        let userResponse = await getUserPosition();
        lat = userResponse.userLatitude;
        long = userResponse.userLongitude;
      }
      // Use default coordinates if geolocation request is denied.
      catch (err) {
        lat = DEFAULT_LATITUDE;
        long = DEFAULT_LONGITUDE;
      }

      // Get location with given coordinates.
      fetch(
        `https://us1.locationiq.com/v1/reverse.php?key=56552b4b1c4b9a&lat=${lat}&lon=${long}&format=json`
      ).then(res => res.json()).then(data => setCurrentLocation(data.address.town));

      // Retrieve weather data for particular location. SI units used by default.
      fetch(
        `https://api.darksky.net/forecast/6385bf526a557ab35c6534562b693fdc/${lat},${long}?units=si`
      ).then(res => res.json()).then(data => setWeatherData(data));
    }

    getInitialWeatherData();

  }, []);

  // Initialise app with retrieved data.
  useEffect(() => {
    if (Object.keys(weatherData).length !== 0) {
      let now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();

      setUpdateTime(`Last updated: ${hours < 10? '0'+hours:hours}:${minutes < 10? '0'+minutes:minutes}`);
      setInitialWeather(weatherData);
      setAppLoaded(true);
    }
  }, [weatherData, setInitialWeather]);

  /* Convert API timestamp (given in seconds) to readable date-time values. */
  function convertUnixTime(timeStamp) {
    const nextDate = new Date(timeStamp * 1000) // Date object uses milliseconds.
    const dayArr = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
    const monthArr = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const nextHour = nextDate.getHours();
    
    return {
      hour: `${nextHour < 10? '0'+nextHour : nextHour}:00`,
      date: nextDate.getDate(),
      day: dayArr[nextDate.getDay()],
      month: monthArr[nextDate.getMonth()]
    }
  }

  function getWeatherIcon(weatherType) {
    return iconList[weatherType.replace(/-/g, '_')];
  }

  function setTheme(timeOfDay) {
    const dayTheme = window.getComputedStyle(document.documentElement).getPropertyValue('--bg-day');
    const nightTheme = window.getComputedStyle(document.documentElement).getPropertyValue('--bg-night');
    const appBackground = document.querySelector('.background');

    if (timeOfDay === 'night') {
      appBackground.style.backgroundImage = nightTheme;
    }
    else {
      appBackground.style.backgroundImage = dayTheme;
    }
  }

  return (
    <>
      <div className='background'></div>
      <Loader appLoaded={appLoaded} />
      <div className='App'>
        <Container>
          <Summary currentLocation={currentLocation} updateTime={updateTime} /><hr />
          <HourlyForecast convertUnixTime={convertUnixTime} getWeatherIcon={getWeatherIcon} /><hr />
          <DailyForecast convertUnixTime={convertUnixTime} getWeatherIcon={getWeatherIcon} /><hr />
          <ComfortLevel /><hr />
          <Wind /><hr />
          <SunAndMoon setTheme={setTheme} /><hr />
          <Footer />
        </Container>
      </div>
    </>
  );
}

export default App;
