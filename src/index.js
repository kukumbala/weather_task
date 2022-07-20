//set current date and time
let now = new Date();
let day = now.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let date = now.getDate();
let month = now.getMonth();
let minutes = now.getMinutes();
let hours = now.getHours();
let currentDate = document.querySelector("#date");
let currentTime = document.querySelector("#time");
currentDate.innerHTML = `${days[day]}, ${months[month]} ${date}`;
if (hours < 10) {
  hours = "0" + hours;
}
if (minutes < 10) {
  minutes = "0" + minutes;
}
currentTime.innerHTML = `${hours}:${minutes}`;

//Weather for searched city
let apiKey = "dbfe710d4217359672738bda52809ad7";
function currentWeather(response) {
  let currentCity = document.querySelector("h1");
  let city = document.querySelector("#city");
  currentCity.innerHTML = response.data.name;
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = response.data.main.humidity;
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = Math.round(response.data.wind.speed);
  let currentPressure = document.querySelector("#pressure");
  currentPressure.innerHTML = response.data.main.pressure;
  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = response.data.weather[0].description;

  document.querySelector(".placeholder-background").value = ``;
}
function searchCity() {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${apiKey}`;
  axios.get(url).then(currentWeather);
}
let button = document.querySelector("#button");
button.addEventListener("click", searchCity);

//get current location and weather
function detectCity(position) {
  let latitude = position.coords.latitude;
  let longtitude = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&units=metric&appid=${apiKey}`;
  axios.get(url).then(currentWeather);
}
function getLocalWeather() {
  navigator.geolocation.getCurrentPosition(detectCity);
}
let pinButton = document.querySelector("#pin");
pinButton.addEventListener("click", getLocalWeather);

//switch fahrenheit-celsius
function change(event) {
  event.preventDefault();
  let currentDegree = document.querySelector("span.celsius");
  let degree = document.querySelector("span.fahrenheit");
  let a = currentDegree.textContent;
  let temperature = document.querySelector("#temperature");
  let temp = temperature.textContent;
  temp = parseInt(temp);
  if (a === "C") {
    currentDegree.innerHTML = "F";
    degree.innerHTML = "C";
    temperature.innerHTML = Math.round(temp * 1.8 + 32);
  } else {
    currentDegree.innerHTML = "C";
    degree.innerHTML = "F";
    temperature.innerHTML = Math.round(((temp - 32) * 5) / 9);
  }
}
let input = document.querySelector("#fahrenheit");
input.addEventListener("click", change);
