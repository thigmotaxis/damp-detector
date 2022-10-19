import cloudyIcon from "./images/cloudyIcon-24w.png";
import partlyCloudyIcon from "./images/partlyCloudyIcon-24w.png";
import rainyIcon from "./images/rainyIcon-24w.png";
import sunnyIcon from "./images/sunnyIcon-24w.png";
import ghLogo from "./images/gitHubLogo-24w.png";
import copyright from "./images/copyright-24w.png";
import { callAPI } from "./storage.js";

// BEGIN RENDERING OF STATIC ELEMENTS

(() => {
  const body = document.querySelector("body");
  body.insertAdjacentHTML(
    "afterbegin",
    `<header>
    <div class="title">Damp Detector</div>
  </header>

  <div class="mainContent">
    <div class="location">--</div>
    <div class="temp">--</div>
    <div class="buttonContainer">
    <button class="toggleTempScale">Display Celsius</button>
      <button class="changeLocation">Change Location</button>
      <input
          type="text"
          placeholder="Enter a city, state, or country"
          class="locationInput hidden"
        />
        <button class="submit hidden">Submit</button>
    </div>
    <div class="conditions"></div>
    <div class="tempRangeContainer">
      <div class="highTemp">H: --</div>
      <div class="lowTemp">L: --</div>
    </div>
    <ul class="fiveDayForecast">
      <li class="forecastContainer">
        <div>Day 1</div>
        <img class="weatherIcon" alt="sunny" />
        <div>H: X° L: Y°</div>
      </li>
      <li class="forecastContainer">
        <div>Day 2</div>
        <img class="weatherIcon" alt="cloudy" />
        <div>H: X° L: Y°</div>
      </li>
      <li class="forecastContainer">
        <div>Day 3</div>
        <img class="weatherIcon" alt="partly cloudy" />
        <div>H: X° L: Y°</div>
      </li>
      <li class="forecastContainer">
        <div>Day 4</div>
        <img class="weatherIcon" alt="rainy" />
        <div>H: X° L: Y°</div>
      </li>
      <li class="forecastContainer">
        <div>Day 5</div>
        <img class="weatherIcon" alt="sunny" />
        <div>H: X° L: Y°</div>
      </li>
    </ul>

    <div class="otherWeatherInfo">
    <div class="other windSpeed">--</div>
    <div class="other windDirection">--</div>
      <div class="other humidity">--</div>
      <div class="other feelsLike">--</div>
    </div>
  </div>
  <footer>
    <a
      href="https://github.com/thigmotaxis/damp-detector"
      class="sourceContainer"
    >
      <img class="repoLogo" alt="the github logo" />
      <div>View Source</div>
    </a>
    <div class="copyrightContainer">
      <img class="copyrightSymbol" alt="the copyright symbol" />
      <div>2022 Abe Industries</div>
    </div>
  </footer>`
  );

  const weatherIconFiles = [
    sunnyIcon,
    cloudyIcon,
    partlyCloudyIcon,
    rainyIcon,
    sunnyIcon,
  ];

  const weatherIcons = document.querySelectorAll(".weatherIcon");
  weatherIcons.forEach((element, index) => {
    element.setAttribute("src", weatherIconFiles[index]);
  });

  const repoLogo = document.querySelector(".repoLogo");
  repoLogo.setAttribute("src", ghLogo);

  const copyrightSymbol = document.querySelector(".copyrightSymbol");
  copyrightSymbol.setAttribute("src", copyright);
})();

// END RENDERING OF STATIC ELEMENTS

export const domCache = {
  location: document.querySelector(".location"),
  temperature: document.querySelector(".temp"),
  toggleTempScale: document.querySelector(".toggleTempScale"),
  changeLocation: document.querySelector(".changeLocation"),
  locationInput: document.querySelector(".locationInput"),
  submitLocation: document.querySelector(".submit"),
  conditions: document.querySelector(".conditions"),
  highTemperature: document.querySelector(".highTemp"),
  lowTemperature: document.querySelector(".lowTemp"),
  windSpeed: document.querySelector(".windSpeed"),
  windDirection: document.querySelector(".windDirection"),
  humidity: document.querySelector(".humidity"),
  feelsLike: document.querySelector(".feelsLike"),
};

export const modifyDOM = (() => {
  const toggleTempScale = () => {
    // retrieve locally stored weather data and update display
    const processedWeatherData = JSON.parse(
      window.localStorage.getItem("currentWeatherData")
    );
    if (localStorage.getItem("tempScale") === "F") {
      localStorage.setItem("tempScale", "C");
      domCache.toggleTempScale.innerHTML = "Display Farenheight";
      domCache.temperature.innerHTML = processedWeatherData.tempC;
      domCache.highTemperature.innerHTML = processedWeatherData.highTempC;
      domCache.lowTemperature.innerHTML = processedWeatherData.lowTempC;
      domCache.feelsLike.innerHTML = processedWeatherData.feelsLikeC;
    } else {
      localStorage.setItem("tempScale", "F");
      domCache.toggleTempScale.innerHTML = "Display Celsius";
      domCache.temperature.innerHTML = processedWeatherData.tempF;
      domCache.highTemperature.innerHTML = processedWeatherData.highTempF;
      domCache.lowTemperature.innerHTML = processedWeatherData.lowTempF;
      domCache.feelsLike.innerHTML = processedWeatherData.feelsLikeF;
    }
  };

  const showInputField = () => {
    domCache.changeLocation.classList.add("hidden");
    domCache.locationInput.classList.remove("hidden");
    domCache.submitLocation.classList.remove("hidden");
  };

  const hideInputField = () => {
    domCache.changeLocation.classList.remove("hidden");
    domCache.locationInput.classList.add("hidden");
    domCache.submitLocation.classList.add("hidden");
  };

  // CREATE HANDLER FUNCTIONS
  const createHandlerFunctions = () => {
    domCache.toggleTempScale.addEventListener("click", toggleTempScale);
    domCache.changeLocation.addEventListener("click", showInputField);
    domCache.submitLocation.addEventListener("click", hideInputField);
    domCache.submitLocation.addEventListener("click", callAPI.getWeatherData);
  };

  const renderWeatherData = (processedWeatherData) => {
    domCache.location.innerHTML = processedWeatherData.location;
    domCache.conditions.innerHTML = processedWeatherData.conditions;
    domCache.windSpeed.innerHTML = processedWeatherData.windSpeed;
    domCache.windDirection.innerHTML = processedWeatherData.windDirection;
    domCache.humidity.innerHTML = processedWeatherData.humidity;
    if (window.localStorage.getItem("tempScale") === "F") {
      domCache.temperature.innerHTML = processedWeatherData.tempF;
      domCache.highTemperature.innerHTML = processedWeatherData.highTempF;
      domCache.lowTemperature.innerHTML = processedWeatherData.lowTempF;
      domCache.feelsLike.innerHTML = processedWeatherData.feelsLikeF;
    } else {
      domCache.temperature.innerHTML = processedWeatherData.tempC;
      domCache.highTemperature.innerHTML = processedWeatherData.highTempC;
      domCache.lowTemperature.innerHTML = processedWeatherData.lowTempC;
      domCache.feelsLike.innerHTML = processedWeatherData.feelsLikeC;
    }
  };

  return { createHandlerFunctions, renderWeatherData };
})();
