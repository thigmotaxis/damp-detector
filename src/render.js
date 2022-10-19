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
   
    <ul class="sevenDayForecast">
        <li class="forecastContainer">
          <div class="day0">Today</div>
          <img
            class="weatherIcon"
            alt="sunny"
          />
          <div class="day0Range">H: X° L: Y°</div>
        </li>
        <li class="forecastContainer">
          <div class="day1">Day 1</div>
          <img
            class="weatherIcon"
            alt="cloudy"
          />
          <div class="day1Range">H: X° L: Y°</div>
        </li>
        <li class="forecastContainer">
          <div class="day2">Day 2</div>
          <img
            class="weatherIcon"
            alt="partly cloudy"
          />
          <div class="day2Range">H: X° L: Y°</div>
        </li>
        <li class="forecastContainer">
          <div class="day3">Day 3</div>
          <img
            class="weatherIcon"
            alt="rainy"
          />
          <div class="day3Range">H: X° L: Y°</div>
        </li>
        <li class="forecastContainer">
          <div class="day4">Day 4</div>
          <img
            class="weatherIcon"
            alt="sunny"
          />
          <div class="day4Range">H: X° L: Y°</div>
        </li>
        <li class="forecastContainer">
          <div class="day5">Day 5</div>
          <img
            class="weatherIcon"
            alt="sunny"
          />
          <div class="day5Range">H: X° L: Y°</div>
        </li>
        <li class="forecastContainer">
          <div class="day6">Day 6</div>
          <img
            class="weatherIcon"
            alt="sunny"
          />
          <div class="day6Range">H: X° L: Y°</div>
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
    sunnyIcon,
    partlyCloudyIcon,
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
  changeLocation: document.querySelector(".changeLocation"),
  locationInput: document.querySelector(".locationInput"),
  submitLocation: document.querySelector(".submit"),
  toggleTempScale: document.querySelector(".toggleTempScale"),

  day0: {
    temperature: document.querySelector(".temp"),
    tempRange: document.querySelector(".day0Range"),
    conditions: document.querySelector(".conditions"),
    highTemperature: document.querySelector(".highTemp"),
    lowTemperature: document.querySelector(".lowTemp"),
    windSpeed: document.querySelector(".windSpeed"),
    windDirection: document.querySelector(".windDirection"),
    humidity: document.querySelector(".humidity"),
    feelsLike: document.querySelector(".feelsLike"),
  },
  day1: {
    dayName: document.querySelector(".day1"),
    tempRange: document.querySelector(".day1Range"),
  },
  day2: {
    dayName: document.querySelector(".day2"),
    tempRange: document.querySelector(".day2Range"),
  },
  day3: {
    dayName: document.querySelector(".day3"),
    tempRange: document.querySelector(".day3Range"),
  },
  day4: {
    dayName: document.querySelector(".day4"),
    tempRange: document.querySelector(".day4Range"),
  },
  day5: {
    dayName: document.querySelector(".day5"),
    tempRange: document.querySelector(".day5Range"),
  },
  day6: {
    dayName: document.querySelector(".day6"),
    tempRange: document.querySelector(".day1Range"),
  },
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
      domCache.day0.temperature.innerHTML = processedWeatherData.current.tempC;
      domCache.day0.tempRange.innerHTML =
        processedWeatherData.current.tempRangeC;
      domCache.day0.feelsLike.innerHTML =
        processedWeatherData.current.feelsLikeC;
    } else {
      localStorage.setItem("tempScale", "F");
      domCache.toggleTempScale.innerHTML = "Display Celsius";
      domCache.day0.temperature.innerHTML = processedWeatherData.current.tempF;
      domCache.day0.tempRange.innerHTML =
        processedWeatherData.current.tempRangeF;
      domCache.day0.feelsLike.innerHTML =
        processedWeatherData.current.feelsLikeF;
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
    domCache.location.innerHTML = JSON.parse(
      window.localStorage.getItem("location")
    );
    domCache.day0.conditions.innerHTML =
      processedWeatherData.current.conditions;
    domCache.day0.windSpeed.innerHTML = processedWeatherData.current.windSpeed;
    domCache.day0.windDirection.innerHTML =
      processedWeatherData.current.windDirection;
    domCache.day0.humidity.innerHTML = processedWeatherData.current.humidity;
    if (window.localStorage.getItem("tempScale") === "F") {
      domCache.day0.temperature.innerHTML = processedWeatherData.current.tempF;
      domCache.day0.tempRange.innerHTML =
        processedWeatherData.current.tempRangeF;
      //   domCache.highTemperature.innerHTML = processedWeatherData.highTempF;
      //   domCache.lowTemperature.innerHTML = processedWeatherData.lowTempF;
      // These will get reinstated when I integrate forecast data
      domCache.day0.feelsLike.innerHTML =
        processedWeatherData.current.feelsLikeF;
    } else {
      domCache.day0.temperature.innerHTML = processedWeatherData.current.tempC;
      domCache.day0.tempRange.innerHTML =
        processedWeatherData.current.tempRangeC;
      domCache.day0.feelsLike.innerHTML =
        processedWeatherData.current.feelsLikeC;
    }
  };

  return { createHandlerFunctions, renderWeatherData };
})();
