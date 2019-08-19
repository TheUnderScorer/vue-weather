import axios from 'axios';

const apiKey = process.env.VUE_APP_OPEN_WEATHER_API_KEY;
const url = `http://api.openweathermap.org/data/2.5/forecast?APPID=${ apiKey }&id=524901`;

const forecastClient = axios.create( {
    baseURL: url,
} );

export default forecastClient;
