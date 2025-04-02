export default function Forecast() {
    async function getForecast(position) {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const ipAddress = ipData.ip;

        const locationResponse = await fetch(`https://ipapi.co/${ipAddress}/json/`);
        const locationData = await locationResponse.json();

        if (!locationData.latitude || !locationData.longitude) {
          throw new Error('Could not determine location from IP.');
        }

        const latitude = locationData.latitude;
        const longitude = locationData.longitude;

        // const latitude = 17.3843;
        // const longitude = 78.4583;
      
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
      
        try {
          const response = await fetch(url);
          const data = await response.json();
      
          const forecastDiv = document.getElementById('forecast_div');
        forecastDiv.innerHTML = ''; // Clear previous content
      
        const days = data.daily.time;
        const maxTemps = data.daily.temperature_2m_max;
        const minTemps = data.daily.temperature_2m_min;
        const weatherCodes = data.daily.weathercode;
      
        for (let i = 1; i < 4; i++) {
          const dayDiv = document.createElement('div');
          dayDiv.className = 'day-div'
          dayDiv.classList.add('day');
      
          const date = new Date(days[i]);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          const dateString = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
          let weatherDescription = getWeatherDescription(weatherCodes[i]);
      
          dayDiv.innerHTML = `
            <h3>${dayName}</h3>
            <p>${dateString}</p>
            <p>Max: ${maxTemps[i]}°C</p>
            <p>Min: ${minTemps[i]}°C</p>
            <p>${weatherDescription}</p>
          `;
      
          forecastDiv.appendChild(dayDiv);
        };
      
        } catch (error) {
          console.error('Error fetching forecast:', error);
          document.getElementById('forecast_div').innerHTML = '<p>Error fetching forecast. Please try again.</p>';
        }
    }
      
    function getWeatherDescription(weatherCode) {
        switch (weatherCode) {
            case 0: return "Clear sky";
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
            case 71: return "Slight snow fall";
            case 73: return "Moderate snow fall";
            case 75: return "Heavy snow fall";
            case 77: return "Snow grains";
            case 80: return "Slight rain";
            case 81: return "Moderate rain";
            case 82: return "Violent rain";
            case 85: return "Slight snow showers";
            case 86: return "Heavy snow showers";
            case 95: return "Thunderstorm";
            case 96: return "Thunderstorm with slight hail";
            case 99: return "Thunderstorm with heavy hail";
            default: return "Unknown";
          }
    }
      
    getForecast();

    return (
      <div>
        <div id="forecast_div"></div>
      </div>
    );
}