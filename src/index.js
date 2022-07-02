let currentTime = new Date();
function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[currentTime.getDay()];
  let months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  let month = months[currentTime.getMonth()];
  let date = currentTime.getDate();
  let hour = currentTime.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = currentTime.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  document.getElementById(
    "date-time"
  ).innerHTML = `${month}, ${date}, ${day}, ${hour}:${minute}`;
}
formatDate(currentTime);

//определение погоды
function showWeatherCondition(response) {
  let temp = Math.round(response.data.main.temp);
  document.querySelector("#city").innerHTML = response.data.name;
  let humid = response.data.main.humidity;
  let wind = response.data.wind.speed;
  document.getElementById("new-temp").innerHTML = `${temp} °C`;
  document.getElementById("humidity").innerHTML = `Humidity: ${humid} %`;
  document.getElementById("wind").innerHTML = `Wind: ${wind} km/h`;
}

let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";

//поиск погоды по городу
function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherCondition);
}

//ввод города
function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  searchCity(city);
}
//мое положение
function myLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeatherCondition);
}
//
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(myLocation);
}

let enterForm = document.querySelector("#enter-search");
enterForm.addEventListener("submit", submitCity);

let button = document.querySelector("button");
button.addEventListener("click", getCurrentLocation);

searchCity("Kyiv");
