document.getElementById('searchBtn').addEventListener('click', () => {
  const city = document.getElementById('cityInput').value;
  if (city) {
    getWeather(city);
  }
});

function getWeather(city) {
  const apiKey = "1eb266133cb44574aef13c2426b812e5"; // Replace with your OpenWeather API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        const resultDiv = document.getElementById('weatherResult');
        resultDiv.innerHTML = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <p>Temperature: ${data.main.temp} °C</p>
          <p>Weather: ${data.weather[0].description}</p>
          <p>Humidity: ${data.main.humidity}%</p>
        `;
      } else {
        alert('City not found!');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to fetch weather data.');
    });
}
