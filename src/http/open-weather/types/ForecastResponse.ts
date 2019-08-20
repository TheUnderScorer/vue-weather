export interface Coord
{
    lon: number;
    lat: number;
}

export interface Weather
{
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface Main
{
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
}

export interface Wind
{
    speed: number;
    deg: number;
    gust: number;
}

export interface Clouds
{
    all: number;
}

export interface Sys
{
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
}

export interface ForecastData
{
    coord: Coord;
    weather: Weather[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    dt_txt: string;
    sys: Sys;
    id: number;
    name: string;
    cod: number;
}

export default interface ForecastResponse
{
    list: ForecastData[];
    cod: string;
    message: number;
    cnt: number;
}
