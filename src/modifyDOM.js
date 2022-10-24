import { domCache } from "./render.js";
import { callAPI } from "./storage.js";
import clearIcon from "./images/icons/clearIcon-36w.png";
import cloudsIcon from "./images/icons/cloudsIcon-36w.png";
import dustIcon from "./images/icons/dustIcon-36w.png";
import fogIcon from "./images/icons/fogIcon-36w.png";
import rainIcon from "./images/icons/rainIcon-36w.png";
import smokeIcon from "./images/icons/smokeIcon-36w.png";
import snowIcon from "./images/icons/snowIcon-36w.png";
import thunderstormIcon from "./images/icons/thunderstormIcon-36w.png";
import tornadoIcon from "./images/icons/tornadoIcon-36w.png";
import clearPortrait from "./images/backgrounds/clear-portrait-640w.jpg";
import clearLandscape from "./images/backgrounds/clear-landscape-1200w.jpg";
import cloudsPortrait from "./images/backgrounds/clouds-portrait-640w.jpg";
import cloudsLandscape from "./images/backgrounds/clouds-landscape-1200w.jpg";
import fogPortrait from "./images/backgrounds/fog-portrait-640w.jpg";
import fogLandscape from "./images/backgrounds/fog-landscape-1200w.jpg";
import rainPortrait from "./images/backgrounds/rain-portrait-640w.jpg";
import rainLandscape from "./images/backgrounds/rain-landscape-1200w.jpg";
import smokePortrait from "./images/backgrounds/smoke-portrait-640w.jpg";
import smokeLandscape from "./images/backgrounds/smoke-landscape-1200w.jpg";
import snowPortrait from "./images/backgrounds/snow-portrait-640w.jpg";
import snowLandscape from "./images/backgrounds/snow-landscape-1200w.jpg";

export const modifyDOM = (() => {
  const toggleTempScale = () => {
    const currentWeatherData = JSON.parse(
      window.localStorage.getItem("currentWeatherData")
    );
    const forecastWeatherData = JSON.parse(
      window.localStorage.getItem("dailyForecast")
    );
    if (localStorage.getItem("tempScale") === "F") {
      localStorage.setItem("tempScale", "C");
      domCache.toggleTempScale.innerHTML = "Display Farenheight";
    } else {
      localStorage.setItem("tempScale", "F");
      domCache.toggleTempScale.innerHTML = "Display Celsius";
    }
    renderWeatherData(currentWeatherData);
    renderForecastData(forecastWeatherData);
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

  const submitLocationViaEnterKey = (e) => {
    if (e.keyCode === 13) {
      domCache.submitLocation.click();
    }
  };

  // CREATE HANDLER FUNCTIONS
  const createHandlerFunctions = () => {
    domCache.toggleTempScale.addEventListener("click", toggleTempScale);
    domCache.changeLocation.addEventListener("click", showInputField);
    domCache.locationInput.addEventListener("keyup", submitLocationViaEnterKey);
    domCache.submitLocation.addEventListener("click", hideInputField);
    domCache.submitLocation.addEventListener("click", callAPI.getWeatherData);
    window
      .matchMedia("(min-width: 700px)")
      .addEventListener("change", renderBackgroundImage); // loads appropriate background image on screen resize
  };

  // CHECK CONDITIONS PROP AND LOAD BACKGROUND IMAGE BASED ON IT
  const renderBackgroundImage = () => {
    const conditions = JSON.parse(
      window.localStorage.getItem("currentWeatherData")
    ).conditions.toLowerCase();
    const mediaQuery = window.matchMedia("(min-width: 700px)");
    const orientation = !mediaQuery.matches ? "Portrait" : "Landscape";
    const locationStrings = [
      "clearPortrait",
      "clearLandscape",
      "cloudsPortrait",
      "cloudsLandscape",
      "fogPortrait",
      "fogLandscape",
      "rainPortrait",
      "rainLandscape",
      "smokePortrait",
      "smokeLandscape",
      "snowPortrait",
      "snowLandscape",
    ];
    const fileLocations = [
      clearPortrait,
      clearLandscape,
      cloudsPortrait,
      cloudsLandscape,
      fogPortrait,
      fogLandscape,
      rainPortrait,
      rainLandscape,
      smokePortrait,
      smokeLandscape,
      snowPortrait,
      snowLandscape,
    ];
    for (let i = 0; i < locationStrings.length; i++) {
      if (locationStrings[i] === conditions + orientation) {
        domCache.html.style.backgroundImage = `url(${fileLocations[i]})`;
        return;
      }
    }
  };

  const renderWeatherData = (data) => {
    domCache.location.innerHTML = JSON.parse(
      window.localStorage.getItem("location")
    );
    domCache.conditions.innerHTML = data.conditions;
    domCache.windSpeed.innerHTML = data.windSpeed;
    domCache.windDirection.innerHTML = data.windDirection;
    domCache.humidity.innerHTML = data.humidity;

    if (window.localStorage.getItem("tempScale") === "F") {
      domCache.temperature.innerHTML = data.tempF;
      domCache.feelsLike.innerHTML = data.feelsLikeF;
    } else {
      domCache.temperature.innerHTML = data.tempC;
      domCache.feelsLike.innerHTML = data.feelsLikeC;
    }
  };

  const renderForecastData = (data) => {
    const dayNameElements = [
      domCache.day0,
      domCache.day1,
      domCache.day2,
      domCache.day3,
      domCache.day4,
      domCache.day5,
      domCache.day6,
    ];

    for (let i = 0; i < data.length; i++) {
      dayNameElements[i].dayName.innerHTML = data[i].dayName;
    }

    const weatherIcons = domCache.weatherIcons;
    weatherIcons.forEach((element, index) => {
      const dailyConditions = data[index].dailyConditions;
      if (dailyConditions === "Clear") {
        element.setAttribute("src", clearIcon);
      }
      if (dailyConditions === "Clouds") {
        element.setAttribute("src", cloudsIcon);
      }
      if (dailyConditions === "Dust" || dailyConditions === "Sand") {
        element.setAttribute("src", dustIcon);
      }
      if (dailyConditions === "Fog" || dailyConditions === "Mist") {
        element.setAttribute("src", fogIcon);
      }
      if (dailyConditions === "Rain" || dailyConditions === "Drizzle") {
        element.setAttribute("src", rainIcon);
      }
      if (
        dailyConditions === "Smoke" ||
        dailyConditions === "Haze" ||
        dailyConditions === "Ash"
      ) {
        element.setAttribute("src", smokeIcon);
      }
      if (dailyConditions === "Snow") {
        element.setAttribute("src", snowIcon);
      }
      if (dailyConditions === "Thunderstorm") {
        element.setAttribute("src", thunderstormIcon);
      }
      if (dailyConditions === "Tornado" || dailyConditions === "Squall") {
        element.setAttribute("src", tornadoIcon);
      }
    });

    // render farenheight temp range data
    if (window.localStorage.getItem("tempScale") === "F") {
      for (let i = 0; i < dayNameElements.length; i++) {
        dayNameElements[i].highTemperature.innerHTML = data[i].highTempF;
        dayNameElements[i].lowTemperature.innerHTML = data[i].lowTempF;
      }
    } else {
      // render celsius temp range data
      for (let i = 0; i < dayNameElements.length; i++) {
        dayNameElements[i].highTemperature.innerHTML = data[i].highTempC;
        dayNameElements[i].lowTemperature.innerHTML = data[i].lowTempC;
      }
    }
  };

  return {
    createHandlerFunctions,
    renderBackgroundImage,
    renderWeatherData,
    renderForecastData,
  };
})();
