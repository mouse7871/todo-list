/** https://openweathermap.org/current */

const weatherBtn = document.getElementById("weather");
window.weatherpage = document.querySelector("#weather-page");

let lat = 37.5833;
let lon = 127;
// let weatherData;

/** https://fontawesome.com/search?o=r&m=free */
const weatherIcon = {
  // "01": "fa-sun",
  "01": "fa-circle",
  "02": "fa-cloud-sun",
  "03": "fa-cloud",
  "04": "fa-cloud",
  "09": "fa-cloud-rain",
  10: "fa-cloud-showers-heavy",
  11: "fa-cloud-bolt",
  13: "fa-snowflake",
  50: "fa-smog",
};

const getAndMakeWeather = (lat, lon) => {
  getApiData(lat, lon)
    .then((data) => {
      makeWeather(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getApiData = (lat, lon) => {
  const key = "8bfd1b295227052c24fe9bdb7c724505";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  return fetch(url) // 프로미스 반환
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
};

const makeWeather = (data) => {
  weatherBtn.innerHTML = `
  <i class="fa-solid ${weatherIcon[data.weather[0].icon.substr(0, 2)]}" />`;
  weatherpage.innerHTML = `
  <div>
    <div>
      <div class="city">${data.name}</div>
      <div class="describe">${data.weather[0].description}</div>
    </div>
    <div class="temp">${data.main.temp}°C</div>
  </div>
  `;
};

sessionStorage.getItem("username")
  ? navigator.geolocation.getCurrentPosition(
      (position) => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        getAndMakeWeather(lat, lon);
      },
      () => {
        getAndMakeWeather(lat, lon);
      }
    )
  : null;

weatherBtn.addEventListener("click", () => {
  weatherpage.classList.toggle(HIDDEN_CLASSNAME);
});