import React, { useEffect, useState } from 'react';
import '../stylesheet/WeatherApp.css';
import axios from 'axios';

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(false);
    const [weatherIconSrc, setWeatherIconSrc] = useState('');

    const handleSearch = async () => {
        try {

    if (city === '') {
        setError(true);
        setWeatherIconSrc('');
        setWeatherData(null);
        return;
    }

    const response = await axios.get(`${import.meta.env.VITE_API_URL}${city}&appid=${import.meta.env.VITE_API_KEY}`);

    setWeatherData(response.data);
    document.querySelector('.error').style.display = 'none'
    console.log(response.data);
    }
    catch (error) {
        console.error('Error fetching weather data:', error);
        setError(true);
        setWeatherIconSrc('');
        setWeatherData(null);
        document.querySelector('.error').style.display = 'block'
    }
    };

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const setWeatherIcon = () => {
        if (weatherData) {
            const weatherMain = weatherData.weather[0].main;

            switch (weatherMain) {
                case 'Clouds':
                    setWeatherIconSrc('../../public/images/clouds.png');
                    break;
                case 'Clear':
                    setWeatherIconSrc('../../public/images/clear.png');
                    break;
                case 'Rain':
                    setWeatherIconSrc('../../public/images/rain.png');
                    break;
                case 'Drizzle':
                    setWeatherIconSrc('../../public/images/drizzle.png');
                    break;
                case 'Mist':
                    setWeatherIconSrc('../../public/images/mist.png');
                    break;
                default:
                    setWeatherIconSrc('');
                    break;
            }
        }
    };

    useEffect(() => {
        // Realizar la búsqueda cuando el componente se monte
        handleSearch();
    }, []);

    useEffect(() => {
        setWeatherIcon();
    }, [weatherData]);

    

    return (
        <div className="card">
            <div className='search-wrapper'>
            <input 
                type="text" 
                spellCheck="false" 
                placeholder="Enter a city name"
                value={city}
                onChange={handleInputChange}
            />
            <button
            onClick={handleSearch}
            >
                <img src="../../public/images/search.png" alt="Search" />
            </button>
            </div>

            {error && (
                <div className="error">
                    <p>Oops! Invalid city name :/</p>
                </div>
            )}

            {weatherData && (
                <div className='weather-wrapper'>
                    <img 
                        src={weatherIconSrc}
                        className="weather-icon"
                        alt='Weather Icon'
                    />
                    <h1 className='temperature'>{Math.round(weatherData.main.temp)} °C</h1>
                    <h2 className='city'>{weatherData.name}</h2>

                    <div className='details'>
                        <div className='column'>
                            <img 
                                src="../../public/images/humidity.png" 
                                alt="Humidity" 
                            />
                            <div>
                                <p className='humidity'>{weatherData.main.humidity}%</p>
                                <p>Humidity</p>
                            </div>
                        </div>

                        <div className='column'>
                            <img 
                                src="../../public/images/wind.png" 
                                alt="Wind Speed" 
                            />
                            <div>
                                <p className='wind'>{weatherData.wind.speed} km/h</p>
                                <p>Wind Speed</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherApp;