# <img src="public/favicon-32x32.png" /> Weather-Byte
###### Huawei Weather App clone built with React.js 

This project was inspired by the simple yet modern and intuitive Huawei Weather app interface. It gives a swift overview of current and upcoming weather conditions at any given set of coordinates. Provided that GPS is enabled, user/device location (i.e. current town or city) is retrieved with the [LocationIQ Geocoding API](https://locationiq.com/geocoding), while all weather-related data is supplied by the [Dark Sky API](https://darksky.net/dev).

In addition to providing a summary of current temperatures and conditions at the top of the screen, Weather-Byte also features:
- a swipeable carousel of **hourly** weather details for the next 24 hours
- upcoming **daily** weather information, incuding maximum and minimum temperatures for the next week
- sunrise/sunset times as well as current moon phase
- comfort level indicating humidity and uv index values
- wind speed and direction (*hint:* hover/tap the windmills to spin them faster)

The default units for the weather data are set to SI units, however the temperature scale (Celcius or Fahrenheit) can be toggled by clicking the settings menu in the top-right corner of the screen, selecting a unit and clicking **Update** (*Note: this also toggles the wind speed between km/h and mph.*).

---
