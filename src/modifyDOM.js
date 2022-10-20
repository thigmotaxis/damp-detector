import { domCache } from "./render.js";
import { callAPI } from "./storage.js";
import { getLocalDays } from "./processData";
import cloudyIcon from "./images/cloudyIcon-24w.png";
import hazyIcon from "./images/hazyIcon-24w.png";
import rainyIcon from "./images/rainyIcon-24w.png";
import snowyIcon from "./images/snowyIcon-24w.png";
import sunnyIcon from "./images/sunnyIcon-24w.png";

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

  // CREATE HANDLER FUNCTIONS
  const createHandlerFunctions = () => {
    domCache.toggleTempScale.addEventListener("click", toggleTempScale);
    domCache.changeLocation.addEventListener("click", showInputField);
    domCache.submitLocation.addEventListener("click", hideInputField);
    domCache.submitLocation.addEventListener("click", callAPI.getWeatherData);
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

    const dayNames = getLocalDays();

    for (let i = 0; i < data.length; i++) {
      dayNameElements[i].dayName.innerHTML = dayNames[i];
    }

    const weatherIcons = domCache.weatherIcons;
    weatherIcons.forEach((element, index) => {
      const dailyConditions = data[index].dailyConditions;
      if (dailyConditions === "Clear") {
        element.setAttribute("src", sunnyIcon);
      }
      if (dailyConditions === "Clouds") {
        element.setAttribute("src", cloudyIcon);
      }
      if (dailyConditions === "Rain") {
        element.setAttribute("src", rainyIcon);
      }
      if (dailyConditions === "Snow") {
        element.setAttribute("src", snowyIcon);
      }
      if (dailyConditions === "Smoke") {
        element.setAttribute("src", hazyIcon);
      }
    });

    // render farenheight temp range data
    if (window.localStorage.getItem("tempScale") === "F") {
      for (let i = 0; i < dayNameElements.length; i++) {
        dayNameElements[i].tempRange.innerHTML = data[i].tempRangeF;
      }
    } else {
      // render celsius temp range data
      for (let i = 0; i < dayNameElements.length; i++) {
        dayNameElements[i].tempRange.innerHTML = data[i].tempRangeC;
      }
    }
  };

  return {
    createHandlerFunctions,
    renderWeatherData,
    renderForecastData,
  };
})();
