let temperatureElement = document.querySelector("#current-temperature");
let currentDateELement = document.querySelector("#current-date");
let windEl = document.querySelector("#wind");
let descriptionEl = document.querySelector("#description");
let cityElement = document.querySelector("#current-city");
let humidityEl = document.querySelector("#humidity");
let currentIcon = document.querySelector("#current-icon");

function displayTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;

  let descriptionRes = response.data.condition.description;
  descriptionEl.innerHTML = descriptionRes;

  let humidityRes = response.data.temperature.humidity;
  humidityEl.innerHTML = `${humidityRes}%`;

  let windRes = response.data.wind.speed;
  windEl.innerHTML = `${windRes}km/h`;

  let date = new Date(response.data.time * 1000);
  currentDateELement.innerHTML = formatDate(date);

  currentIcon.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon" />`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;
  searchCity(city);
}
searchCity("Paris");

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);


let forecastRow = document.querySelector("#forecast-row");

function displayForecast() {
  let days = ['Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
  let forecastEl = ''

  days.forEach(function(day) {
    forecastEl =
      forecastEl +
      `<div>
        <div class="forecast-date">${day}</div>
            <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/few-clouds-night.png" class="forecast-icon">
            <div class="forecast-temperature">
              <span class="forecast-temperature-max">10º</span>
              <span class="forecast-temperature-min">7º</span>
        </div>
      </div>`;
  })
          
  forecastRow.innerHTML = forecastEl;
}

displayForecast();