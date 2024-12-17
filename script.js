const apiKey = 'a872c0f235dae55288bd675beb35ca06'; // Your OpenWeatherMap API key

// Weather icons for different conditions
const weatherIcons = {
  clear: 'fas fa-sun',
  clouds: 'fas fa-cloud',
  rain: 'fas fa-cloud-showers-heavy',
  snow: 'fas fa-snowflake',
  drizzle: 'fas fa-cloud-rain',
  thunderstorm: 'fas fa-bolt',
  mist: 'fas fa-smog',
};

async function getWeather() {
  const city = document.getElementById('city').value;
  const weatherInfo = document.getElementById('weather-info');
  const cityName = document.getElementById('city-name');
  const weatherIcon = document.getElementById('weather-icon');
  const temp = document.getElementById('temp');
  const humidity = document.getElementById('humidity');
  const description = document.getElementById('description');

  if (city === '') {
    alert('Please enter a city name');
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === '404') {
      alert('City not found');
      return;
    }

    const { name, main, weather, wind } = data;
    const weatherCondition = weather[0].main.toLowerCase();

    // Update the UI
    cityName.innerText = `City: ${name}`;
    temp.innerText = `Temperature: ${main.temp}°C`;
    humidity.innerText = `Humidity: ${main.humidity}%`;
    description.innerText = `Description: ${weather[0].description}`;
    weatherIcon.className = `weather-icon ${weatherIcons[weatherCondition] || 'fas fa-cloud'}`;

    // Display weather info section
    weatherInfo.style.display = 'block';

    // Background Image based on weather
    document.body.style.background = `url('https://source.unsplash.com/1600x900/?${weatherCondition}') no-repeat center center fixed`;
    document.body.style.backgroundSize = 'cover';

    // Create chart for temperature and humidity
    createWeatherChart(main.temp, main.humidity);

  } catch (error) {
    alert('Failed to fetch weather data');
  }
}

// Create a chart using Chart.js
function createWeatherChart(temp, humidity) {
  const ctx = document.getElementById('weather-chart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Temperature (°C)', 'Humidity (%)'],
      datasets: [{
        label: 'Weather Data',
        data: [temp, humidity],
        backgroundColor: ['#4CAF50', '#2196F3'],
        borderColor: ['#388E3C', '#1976D2'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
