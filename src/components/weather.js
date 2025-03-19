export default function Weather() {
    async function getLiveWeather() {
        try {
          // const ipResponse = await fetch('https://api.ipify.org?format=json');
          // const ipData = await ipResponse.json();
          // const ipAddress = ipData.ip;
      
          // const locationResponse = await fetch(`https://ipapi.co/${ipAddress}/json/`);
          // const locationData = await locationResponse.json();
      
          // if (!locationData.latitude || !locationData.longitude) {
          //   throw new Error('Could not determine location from IP.');
          // }
      
          const latitude = 17.3843;
          const longitude = 78.4583;
          const city = 'Hyderabad';
      
          const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m,wind_direction_10m&timezone=auto`
          );
          const weatherData = await weatherResponse.json();
      
          const temperature = weatherData.current.temperature_2m;
          const weatherCode = weatherData.current.weather_code;
          const humidity = weatherData.current.relative_humidity_2m;
          const windSpeed = weatherData.current.wind_speed_10m;
          const windDirectionDegree = weatherData.current.wind_direction_10m;
          let windDirection;
      
          const weatherDescriptions = {
            0: { description: 'Clear sky', icon: 'https://i.gifer.com/Lx0q.gif' },
            1: { description: 'Mainly clear', icon: 'https://i.gifer.com/Lx0q.gif' },
            2: { description: 'Partly cloudy', icon: 'https://i.gifer.com/Lx0q.gif' },
            3: { description: 'Overcast', icon: 'https://i.pinimg.com/originals/b6/7f/61/b67f61a1364ea22a050d701c7bf7858f.gif' },
            45: { description: 'Fog', icon: 'https://i.pinimg.com/originals/02/8f/c0/028fc0f58b6d275812336e90c6ba4251.gif' },
            48: { description: 'Depositing rime fog', icon: 'https://i.pinimg.com/originals/02/8f/c0/028fc0f58b6d275812336e90c6ba4251.gif' },
            51: { description: 'Light drizzle', icon: 'https://i.gifer.com/7scx.gif' },
            53: { description: 'Moderate drizzle', icon: 'https://i.gifer.com/7scx.gif' },
            55: { description: 'Dense drizzle', icon: 'https://i.gifer.com/7scx.gif' },
            56: { description: 'Light freezing drizzle', icon: 'https://i.gifer.com/7scx.gif' },
            57: { description: 'Dense freezing drizzle', icon: 'https://i.gifer.com/7scx.gif' },
            61: { description: 'Slight rain', icon: 'https://i.pinimg.com/originals/81/f8/35/81f8354b66434275e298d93c3b5a85bb.gif' },
            63: { description: 'Moderate rain', icon: 'https://i.pinimg.com/originals/81/f8/35/81f8354b66434275e298d93c3b5a85bb.gif' },
            65: { description: 'Heavy rain', icon: 'https://i.pinimg.com/originals/81/f8/35/81f8354b66434275e298d93c3b5a85bb.gif' },
            66: { description: 'Light freezing rain', icon: 'https://i.pinimg.com/originals/81/f8/35/81f8354b66434275e298d93c3b5a85bb.gif' },
            67: { description: 'Heavy freezing rain', icon: 'https://i.pinimg.com/originals/81/f8/35/81f8354b66434275e298d93c3b5a85bb.gif' },
            71: { description: 'Slight snow fall', icon: 'https://i0.wp.com/djedwardson.com/wp-content/uploads/2014/01/snowFall-animated.gif?fit=500%2C281&ssl=1' },
            73: { description: 'Moderate snow fall', icon: 'https://i0.wp.com/djedwardson.com/wp-content/uploads/2014/01/snowFall-animated.gif?fit=500%2C281&ssl=1' },
            75: { description: 'Heavy snow fall', icon: 'https://i0.wp.com/djedwardson.com/wp-content/uploads/2014/01/snowFall-animated.gif?fit=500%2C281&ssl=1' },
            77: { description: 'Snow grains', icon: 'https://i0.wp.com/djedwardson.com/wp-content/uploads/2014/01/snowFall-animated.gif?fit=500%2C281&ssl=1' },
            80: { description: 'Slight rain showers', icon: 'https://i.pinimg.com/originals/81/f8/35/81f8354b66434275e298d93c3b5a85bb.gif' },
            81: { description: 'Moderate rain showers', icon: 'https://i.pinimg.com/originals/81/f8/35/81f8354b66434275e298d93c3b5a85bb.gif' },
            82: { description: 'Violent rain showers', icon: 'https://i.pinimg.com/originals/81/f8/35/81f8354b66434275e298d93c3b5a85bb.gif' },
            85: { description: 'Slight snow showers', icon: 'https://i0.wp.com/djedwardson.com/wp-content/uploads/2014/01/snowFall-animated.gif?fit=500%2C281&ssl=1' },
            86: { description: 'Heavy snow showers', icon: 'https://i0.wp.com/djedwardson.com/wp-content/uploads/2014/01/snowFall-animated.gif?fit=500%2C281&ssl=1' },
            95: { description: 'Thunderstorm', icon: 'https://media1.giphy.com/media/8xY1YYpEZ4dws/200.gif?cid=6c09b9521q9vmnx06fy68ohibpad5jij6ew0niowslkuhdox&ep=v1_internal_gif_by_id&rid=200.gif&ct=g' },
            96: { description: 'Thunderstorm with slight hail', icon: 'https://media1.giphy.com/media/8xY1YYpEZ4dws/200.gif?cid=6c09b9521q9vmnx06fy68ohibpad5jij6ew0niowslkuhdox&ep=v1_internal_gif_by_id&rid=200.gif&ct=g' },
            99: { description: 'Thunderstorm with heavy hail', icon: 'https://media1.giphy.com/media/8xY1YYpEZ4dws/200.gif?cid=6c09b9521q9vmnx06fy68ohibpad5jij6ew0niowslkuhdox&ep=v1_internal_gif_by_id&rid=200.gif&ct=g' },
          };
      
          const weatherInfoObj = weatherDescriptions[weatherCode] || { description: 'Unknown', icon: 'unknown.png' };
          const description = weatherInfoObj.description;
          const icon = weatherInfoObj.icon;

      if (windDirectionDegree === 0) {
        windDirection = "N"
      } else if (windDirectionDegree < 90) {
        windDirection = "NE"
      } else if (windDirectionDegree === 90) {
        windDirection = "E"
      } else if (windDirectionDegree < 180) {
        windDirection = "SE"
      } else if (windDirectionDegree === 180) {
        windDirection = "S"
      } else if (windDirectionDegree < 270) {
        windDirection = "SW"
      } else if (windDirectionDegree === 270) {
        windDirection = "W"
      } else if (windDirectionDegree < 360) {
        windDirection = "NW"
      }


      document.getElementById('image').src = icon

      const locationInfo = `
        <p>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#00000">
            <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/>
          </svg>
          ${city}
        </p>
      `
      document.getElementById('location-info').innerHTML = locationInfo

      const temperatureInfo = `
        <p>${temperature}°C</p>
      `
      document.getElementById('temperature-info').innerHTML = temperatureInfo;

      const descriptionInfo = `
        <p>${description}</p>
      `
      document.getElementById('description-info').innerHTML = descriptionInfo;

      const humidityInfo = `
        <p>${humidity}%</p>
      `
      document.getElementById('humidity-info').innerHTML = humidityInfo;

      const windInfo = `
        <p>${windSpeed} m/s ${windDirection} (${windDirectionDegree}°)</p>
      `;
      document.getElementById('wind-info').innerHTML = windInfo;

    } catch (error) {
      console.error('Error fetching weather data:', error);
      document.getElementById('weather-info').innerHTML = `<p>Error: ${error.message}</p>`;
    }
  }
  getLiveWeather();
  return (
    <div className="weather-container">
      <div style={{ width: "25vw", position: "relative" }}>
        <img src="" alt="Weather" id="image" style={{ width: "100%", display: "block" }}></img>
        <div id="location-info" style={{ position: "absolute", top: "13vh", left: "1vw", backgroundColor: "rgba(255, 255, 255, 0)"}}>
            <p></p>
        </div>
        <div className="main-weather-info">
          <div id="temperature-info">
            <p>Loading weather...</p>
          </div>
          <div id="description-info">
            <p> </p>
          </div>
        </div>

        <div className="other-weather-info">
          <div id="humidity">
            <p>Humidity</p>
          </div>
          <div id="wind">
            <p>Wind</p>
          </div>
          <div id="humidity-info">
            <p>--</p>
          </div>
          <div id="wind-info">
            <p>--</p>
          </div>
        </div>
      </div>
    </div>
  );
}
