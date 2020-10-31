let timeNow = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let currentDay = days[timeNow.getDay()];
let hours = timeNow.getHours();
let minutes = timeNow.getMinutes();

let currentTime = document.querySelector("h5");
currentTime.innerHTML = `${currentDay}, ${hours}:${minutes}`;

let apiKey = "3ba861b54cd5df7a279d3463ebc72481";

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;

function changeCity(event) {
  event.preventDefault();
  let citySearched = document.querySelector("#city-input");
  axios.get(`${apiUrl}q=${citySearched.value}&units=metric&appid=${apiKey}`).then(showTemperature);  
}

function findPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  axios.get(`${apiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`).then(showTemperature);  
  }
  findPosition();

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityName = response.data.name;
  let weatherCondition = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  humidityHtml.innerHTML = `Humidity: ${humidity}%`;
  windHtml.innerHTML = `Wind Speed: ${wind}Km/h`;
  conditionHtml.innerHTML = `${weatherCondition}`;
  temperatureElement.innerHTML = `${temperature}`;
  currentCity.innerHTML = `${cityName}`;
}

let temperatureElement = document.querySelector("#temperature");
let humidityHtml = document.querySelector("#humidity");
let windHtml = document.querySelector("#wind");
let conditionHtml = document.querySelector("#condition");
let currentCity = document.querySelector("#currentCity");

let searchNewCity = document.querySelector("#searchButton");
searchNewCity.addEventListener("click", changeCity);

let getCurrentCity = document.querySelector("#currentCityButton");
getCurrentCity.addEventListener("click", findPosition);






