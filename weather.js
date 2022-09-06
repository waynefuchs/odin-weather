const searchElement = document.querySelector("#cityname");
const searchButton = document.querySelector('#search-button');
const mainElement = document.querySelector('main');
searchElement.focus();

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
        const apiKey = 'e98806a61a3fd4d2482ec210f64bd243';
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
