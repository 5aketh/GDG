import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';

export default function Weather() {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [city, setCity] = useState(null);
    const [temperature, setTemperature] = useState(null);
    const [description, setDescription] = useState(null);
    const [icon, setIcon] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [windSpeed, setWindSpeed] = useState(null);
    const [windDirection, setWindDirection] = useState(null);
    const [windDirectionDegree, setWindDirectionDegree] = useState(null);
    const [forecastData, setForecastData] = useState([]);

    async function getLiveLocation() {
        try {
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipResponse.json();
            const ipAddress = ipData.ip;

            const locationResponse = await fetch(`https://ipapi.co/${ipAddress}/json/`);
            const locationData = await locationResponse.json();

            if (!locationData.latitude || !locationData.longitude) {
                throw new Error('Could not determine location from IP.');
            }
            setLatitude(locationData.latitude);
            setLongitude(locationData.longitude);
            setCity(locationData.city);
        } catch (error) {
            console.error('Error fetching location:', error);
            alert('Could not determine your location. Please ensure you have internet connectivity.');
        }
    }

    async function getLiveWeather() {
        if (!latitude || !longitude) return;
        try {
            const weatherResponse = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m,wind_direction_10m&timezone=auto`
            );
            const weatherData = await weatherResponse.json();

            if (weatherData.current) {
                setTemperature(weatherData.current.temperature_2m);
                const weatherCode = weatherData.current.weather_code;
                setHumidity(weatherData.current.relative_humidity_2m);
                setWindSpeed(weatherData.current.wind_speed_10m);
                setWindDirectionDegree(weatherData.current.wind_direction_10m);

                const weatherDescriptions = {
                    0: { description: 'Clear sky', icon: '01d' },
                    1: { description: 'Mainly clear', icon: '01d' },
                    2: { description: 'Partly cloudy', icon: '02d' },
                    3: { description: 'Overcast', icon: '03d' },
                    45: { description: 'Fog', icon: '50d' },
                    48: { description: 'Depositing rime fog', icon: '50d' },
                    51: { description: 'Light drizzle', icon: '09d' },
                    53: { description: 'Moderate drizzle', icon: '09d' },
                    55: { description: 'Dense drizzle', icon: '09d' },
                    56: { description: 'Light freezing drizzle', icon: '09d' },
                    57: { description: 'Dense freezing drizzle', icon: '09d' },
                    61: { description: 'Slight rain', icon: '10d' },
                    63: { description: 'Moderate rain', icon: '10d' },
                    65: { description: 'Heavy rain', icon: '09d' },
                    66: { description: 'Light freezing rain', icon: '13d' },
                    67: { description: 'Heavy freezing rain', icon: '13d' },
                    71: { description: 'Slight snow fall', icon: '13d' },
                    73: { description: 'Moderate snow fall', icon: '13d' },
                    75: { description: 'Heavy snow fall', icon: '13d' },
                    77: { description: 'Snow grains', icon: '13d' },
                    80: { description: 'Slight rain showers', icon: '09d' },
                    81: { description: 'Moderate rain showers', icon: '09d' },
                    82: { description: 'Violent rain showers', icon: '09d' },
                    85: { description: 'Slight snow showers', icon: '13d' },
                    86: { description: 'Heavy snow showers', icon: '13d' },
                    95: { description: 'Thunderstorm', icon: '11d' },
                    96: { description: 'Thunderstorm with slight hail', icon: '11d' },
                    99: { description: 'Thunderstorm with heavy hail', icon: '11d' },
                };

                const weatherInfoObj = weatherDescriptions[weatherCode] || { description: 'Unknown', icon: '01n' };
                setDescription(weatherInfoObj.description);
                setIcon(`https://openweathermap.org/img/wn/${weatherInfoObj.icon}@2x.png`);
            } else {
                console.error('Error fetching live weather data:', weatherData);
                alert('Failed to fetch live weather data.');
            }

        } catch (error) {
            console.error('Error fetching weather data:', error);
            alert(`Error fetching live weather: ${error.message}`);
        }
    }

    async function getForecast() {
        if (!latitude || !longitude) return;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.daily) {
                const days = data.daily.time;
                const maxTemps = data.daily.temperature_2m_max;
                const minTemps = data.daily.temperature_2m_min;
                const weatherCodes = data.daily.weathercode;
                const forecastItems = [];

                for (let i = 1; i < Math.min(days.length, 6); i++) { // Fetch up to 5 days
                    const date = new Date(days[i]);
                    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                    const maxTemp = maxTemps[i];
                    const minTemp = minTemps[i];
                    const weatherDescription = getWeatherDescription(weatherCodes[i]);
                    const icon = getWeatherIcon(weatherCodes[i]);

                    forecastItems.push({
                        dayName,
                        maxTemp,
                        minTemp,
                        weatherDescription,
                        icon,
                    });
                }
                setForecastData(forecastItems);
            } else {
                console.error('Error fetching forecast data:', data);
                alert('Failed to fetch forecast data.');
            }

        } catch (error) {
            console.error('Error fetching forecast:', error);
            alert(`Error fetching forecast: ${error.message}`);
        }
    }

    function getWeatherDescription(weatherCode) {
        switch (weatherCode) {
            case 0: return "Clear";
            case 1: return "Mainly clear";
            case 2: return "Partly cloudy";
            case 3: return "Overcast";
            case 45: return "Fog";
            case 48: return "Freezing fog";
            case 51: return "Light drizzle";
            case 53: return "Moderate drizzle";
            case 55: return "Dense drizzle";
            case 56: return "Light freezing drizzle";
            case 57: return "Dense freezing drizzle";
            case 61: return "Slight rain";
            case 63: return "Moderate rain";
            case 65: return "Heavy rain";
            case 66: return "Light freezing rain";
            case 67: return "Heavy freezing rain";
            case 71: return "Slight snow";
            case 73: return "Moderate snow";
            case 75: return "Heavy snow";
            case 77: return "Snow grains";
            case 80: return "Slight rain showers";
            case 81: return "Moderate rain showers";
            case 82: return "Violent rain showers";
            case 85: return "Slight snow showers";
            case 86: return "Heavy snow showers";
            case 95: return "Thunderstorm";
            case 96: return "Thunderstorm with slight hail";
            case 99: return "Thunderstorm with heavy hail";
            default: return "Unknown";
        }
    }

    function getWeatherIcon(weatherCode) {
        const iconMappings = {
            0: '01d', 1: '01d', 2: '02d', 3: '03d', 45: '50d', 48: '50d',
            51: '09d', 53: '09d', 55: '09d', 56: '09d', 57: '09d',
            61: '10d', 63: '10d', 65: '09d', 66: '13d', 67: '13d',
            71: '13d', 73: '13d', 75: '13d', 77: '13d',
            80: '09d', 81: '09d', 82: '09d', 85: '13d', 86: '13d',
            95: '11d', 96: '11d', 99: '11d',
        };
        const iconCode = iconMappings[weatherCode] || '01n';
        return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    }

    useEffect(() => {
        getLiveLocation();
    }, []);

    useEffect(() => {
        if (latitude && longitude) {
            getLiveWeather();
            getForecast();
        }
    });

    useEffect(() => {
        if (windDirectionDegree !== null) {
            if (windDirectionDegree >= 337.5 || windDirectionDegree < 22.5) {
                setWindDirection("N");
            } else if (windDirectionDegree >= 22.5 && windDirectionDegree < 67.5) {
                setWindDirection("NE");
            } else if (windDirectionDegree >= 67.5 && windDirectionDegree < 112.5) {
                setWindDirection("E");
            } else if (windDirectionDegree >= 112.5 && windDirectionDegree < 157.5) {
                setWindDirection("SE");
            } else if (windDirectionDegree >= 157.5 && windDirectionDegree < 202.5) {
                setWindDirection("S");
            } else if (windDirectionDegree >= 202.5 && windDirectionDegree < 247.5) {
                setWindDirection("SW");
            } else if (windDirectionDegree >= 247.5 && windDirectionDegree < 292.5) {
                setWindDirection("W");
            } else if (windDirectionDegree >= 292.5 && windDirectionDegree < 337.5) {
                setWindDirection("NW");
            }
        }
    }, [windDirectionDegree]);

    return (
        <div className="weather-app">
            <Sidebar />
            <div className="weather-container">
                <div className="current-weather-section">
                    <div className="location" id='location-info'>{city || '--'}</div>
                    <div className="current-weather">
                        <img src={icon || "https://openweathermap.org/img/wn/01n@2x.png"} alt="Weather" className="icon" id='image' />
                        <div className="temperature" id='temperature-info'>{temperature !== null ? `${temperature}°C` : '--'}</div>
                        <div className="description" id='description-info'>{description || '--'}</div>
                    </div>
                    <div className="details">
                        <div className="detail-item">
                            <span className="detail-label">Humidity:</span> <span id="humidity-info">{humidity !== null ? `${humidity}%` : '--'}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Wind:</span> <span id="wind-info">{windSpeed !== null ? `${windSpeed} m/s ${windDirection || ''}` : '--'}</span>
                        </div>
                    </div>
                </div>
                <div className="forecast-section">
                    <div className="forecast">
                        <h2 className="forecast-title">Forecast</h2>
                        <div id='forecast-data' className="forecast-data-container">
                            {forecastData.map((item, index) => (
                                <div className="forecast-item" key={index}>
                                    <span className="forecast-day">{item.dayName}</span>
                                    <img src={item.icon} alt="Weather" className="forecast-icon" />
                                    <span className="forecast-temp">{item.maxTemp}°C / {item.minTemp}°C</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
