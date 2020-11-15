function formatDate(timestamp) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
 
  let timeNow = new Date(timestamp);

  let currentDay = days[timeNow.getDay()];
  let hours = timeNow.getHours();
  let minutes = timeNow.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
return `${currentDay} ${hours}:${minutes}`;
}

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

function calculateImperial(event) {
  event.preventDefault();
  let citySearched = document.querySelector("#city-input");
  axios.get(`${apiUrl}q=${citySearched.value}&appid=${apiKey}&units=imperial`).then(showTemperature);
}

function calculateCelsius(event) {
  event.preventDefault();
  let citySearched = document.querySelector("#city-input");
  axios.get(`${apiUrl}q=${citySearched.value}&appid=${apiKey}&units=metric`).then(showTemperature);  
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityName = response.data.name;
  let weatherCondition = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let pressure = response.data.main.pressure;

  humidityHtml.innerHTML = humidity;
  windHtml.innerHTML = `${wind}km/h`;
  conditionHtml.innerHTML = weatherCondition;
  temperatureElement.innerHTML = temperature;
  currentCity.innerHTML = cityName;
  pressureHtml.innerHTML =  pressure;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description)
}


let dateElement = document.querySelector("#current-time")
let temperatureElement = document.querySelector("#temperature");
let humidityHtml = document.querySelector("#humidity");
let windHtml = document.querySelector("#wind");
let conditionHtml = document.querySelector("#condition");
let currentCity = document.querySelector("#currentCity");
let pressureHtml = document.querySelector("#pressure");
let iconElement = document.querySelector("#icon");

let searchNewCity = document.querySelector("#searchButton");
searchNewCity.addEventListener("click", changeCity);

let getCurrentCity = document.querySelector("#currentCityButton");
getCurrentCity.addEventListener("click", findPosition);

let changeToFahrenheit = document.querySelector("#fahrenheit");
changeToFahrenheit.addEventListener("click", calculateImperial);

let changeToCelsius = document.querySelector("#celsius");
changeToCelsius.addEventListener("click", calculateCelsius);






