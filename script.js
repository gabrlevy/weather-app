function formatDate(timestamp) {
  let timeNow = new Date(timestamp);
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
  return `${currentDay} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let timeNow = new Date(timestamp);
  let hours = timeNow.getHours();
  let minutes = timeNow.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
return `${hours}:${minutes}`;
}

function calculateImperial(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function calculateCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active")
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}


function showTemperature(response) {
  let cityName = response.data.name;
  let weatherCondition = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let pressure = response.data.main.pressure;

  celsiusTemperature = Math.round(response.data.main.temp);

  humidityHtml.innerHTML = humidity;
  windHtml.innerHTML = `${wind}km/h`;
  conditionHtml.innerHTML = weatherCondition;
  temperatureElement.innerHTML = celsiusTemperature;
  currentCity.innerHTML = cityName;
  pressureHtml.innerHTML =  pressure;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description)
}

function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  
  for (let index = 0; index < 6; index++){
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
  <div class="col-2" id="forecast-element">
    <h3 class="forecast-timestamp">${formatHours(forecast.dt * 1000)}</h3>
    <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="${forecast.weather[0].main}" class="float-left" id="icon"/>
    <strong>${Math.round(forecast.main.temp_max)}°</strong>
  </div>`;
  }
}

//-------> global variables <------
let dateElement = document.querySelector("#current-time")
let temperatureElement = document.querySelector("#temperature");
let humidityHtml = document.querySelector("#humidity");
let windHtml = document.querySelector("#wind");
let conditionHtml = document.querySelector("#condition");
let currentCity = document.querySelector("#currentCity");
let pressureHtml = document.querySelector("#pressure");
let iconElement = document.querySelector("#icon");
let celsiusTemperature = null;
let jerusalem = "Jerusalem";
let angerManagement = "lickinzedicken";

let searchNewCity = document.querySelector("#searchButton");
searchNewCity.addEventListener("click", changeCity);

let submitForm = document.querySelector("#search-form");
submitForm.addEventListener("submit", changeCity);

let getCurrentCity = document.querySelector("#currentCityButton");
getCurrentCity.addEventListener("click", findPosition);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", calculateImperial);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", calculateCelsius);



function findPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let apiKey = "3ba861b54cd5df7a279d3463ebc72481";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  axios.get(`${apiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`).then(showTemperature);  
  
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
  }
  findPosition();


  
  function search(city) {

  let apiKey = "3ba861b54cd5df7a279d3463ebc72481";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;
    axios.get(`${apiUrl}q=${city}&appid=${apiKey}&units=metric`).then(showTemperature);
  
    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showForecast);
    }
    
    function changeCity(event) {
      event.preventDefault();
      let citySearched = document.querySelector("#city-input");
      if (citySearched.value === angerManagement) {
        currentCity.innerHTML = "Lickinzedicken, Germany";
      } else if (citySearched.value === "capital of israel") {
        search("jerusalem")
      } else {
      search(citySearched.value)};
    }
   



