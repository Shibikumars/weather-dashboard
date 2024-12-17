const apiKey = 'a872c0f235dae55288bd675beb35ca06'; // Your OpenWeatherMap API key

async function getWeather() {
  const city = document.getElementById('city').value;
  const weatherInfo = document.getElementById('weather-info');

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

    const { name, main, weather } = data;

    document.getElementById('city-name').innerText = `City: ${name}`;
    document.getElementById('temp').innerText = `Temperature: ${main.temp}°C`;
    document.getElementById('humidity').innerText = `Humidity: ${main.humidity}%`;
    document.getElementById('description').innerText = `Description: ${weather[0].description}`;

    weatherInfo.style.display = 'block';
  } catch (error) {
    alert('Failed to fetch weather data');
  }
}
