const searchElement = document.querySelector("#cityname");
const searchButton = document.querySelector('#search-button');
const mainElement = document.querySelector('main');
searchElement.focus();

const kelvinToFahrenheit = (k) => (((k - 273.15) * 9)/5)+32;

const data = {
  coord: { lon: -0.1257, lat: 51.5085 },
  weather: [
    { id: 804, main: "Clouds", description: "overcast clouds", icon: "04d" },
  ],
  base: "stations",
  main: {
    temp: 288.84,
    feels_like: 288.89,
    temp_min: 286.14,
    temp_max: 291.01,
    pressure: 1014,
    humidity: 93,
  },
  visibility: 10000,
  wind: { speed: 2.57, deg: 230 },
  clouds: { all: 100 },
  dt: 1662355523,
  sys: {
    type: 2,
    id: 2075535,
    country: "GB",
    sunrise: 1662355162,
    sunset: 1662403175,
  },
  timezone: 3600,
  id: 2643743,
  name: "London",
  cod: 200,
};

{
/* Create This:
<div class="weather-card">
    <div class="forecast">
        <div class="overview">
            <div class="current-weather no-pad">Current Weather</div>
            <div class="city-name no-pad">Berrien Springs</div>        
        </div>
        <div class="temperature farenheit">69</div>
        <div class="conditions">
            <p class="farenheit">FEELS LIKE: 70</p>
            <p>WIND: 5 MPH</p>
            <p>HUMIDITY: 69%</p>
        </div>    
    </div>
</div>
*/
}
function addForecast(data) {
    console.log(data);

    const forecast = document.createElement('div');
    forecast.classList.add("forecast");
    forecast.classList.add('weather-card');

    const overview = document.createElement('div');
    overview.classList.add("overview");

    const currentWeather = document.createElement('div');
    currentWeather.classList.add('current-weather');
    currentWeather.classList.add('no-pad');
    currentWeather.textContent = data.weather[0].description;

    const cityName = document.createElement('div');
    cityName.classList.add('city-name');
    cityName.classList.add('no-pad');
    cityName.textContent = data.name;

    overview.append(currentWeather);
    overview.append(cityName);
    forecast.append(overview);

    const temperature = document.createElement('div');  
    temperature.classList.add('temperature');
    temperature.classList.add('fahrenheit');
    temperature.textContent = data.main.temp;

    forecast.append(temperature);

    const conditions = document.createElement('div');
    conditions.classList.add('conditions');

    const feelsLike = document.createElement('div');
    feelsLike.classList.add('fahrenheit');
    feelsLike.textContent = `feels like: ${data.main.feels_like}`;

    const wind = document.createElement('div');
    wind.textContent = `wind: ${data.wind.speed}mph`;

    const humidity = document.createElement('div');
    humidity.textContent = `humidity: ${data.main.humidity}%`;

    conditions.append(feelsLike);
    conditions.append(wind);
    conditions.append(humidity);
    forecast.append(conditions);

    return forecast;
}

const removeForecastFromPage = () => {
    while(mainElement.firstChild) {
        mainElement.removeChild(mainElement.firstChild);
    }
}

async function getForecast() {
    try {
        const apiKey = 'APIKEYHERE';
        const city = searchElement.value;
        const httpResponse = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`);
        const data = await httpResponse.json();
        const forecastCard = addForecast(data);
        removeForecastFromPage();
        mainElement.append(forecastCard);    
    } catch (error) {
        console.error(error);
    }
}

searchButton.addEventListener('click', (event) => {
    getForecast();
});
