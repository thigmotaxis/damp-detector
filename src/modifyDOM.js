import { domCache } from "./render.js";
import { callAPI } from "./storage.js";
import { getLocalDays } from "./processData";

export const modifyDOM = (() => {
  const toggleTempScale = () => {
    // retrieve locally stored weather data and update display
    const processedWeatherData = JSON.parse(
      window.localStorage.getItem("currentWeatherData")
    );
    if (localStorage.getItem("tempScale") === "F") {
      localStorage.setItem("tempScale", "C");
      domCache.toggleTempScale.innerHTML = "Display Farenheight";

      //   update today's temps
      domCache.day0.temperature.innerHTML = processedWeatherData.current.tempC;
      domCache.day0.tempRange.innerHTML =
        processedWeatherData.current.tempRangeC;
      domCache.day0.feelsLike.innerHTML =
        processedWeatherData.current.feelsLikeC;

      // update forecast temps
      domCache.day1.tempRange.innerHTML = processedWeatherData.day1.tempRangeC;
      domCache.day2.tempRange.innerHTML = processedWeatherData.day2.tempRangeC;
      domCache.day3.tempRange.innerHTML = processedWeatherData.day3.tempRangeC;
      domCache.day4.tempRange.innerHTML = processedWeatherData.day4.tempRangeC;
      domCache.day5.tempRange.innerHTML = processedWeatherData.day5.tempRangeC;
      domCache.day6.tempRange.innerHTML = processedWeatherData.day6.tempRangeC;
    } else {
      localStorage.setItem("tempScale", "F");
      domCache.toggleTempScale.innerHTML = "Display Celsius";

      //   update today's temps
      domCache.day0.temperature.innerHTML = processedWeatherData.current.tempF;
      domCache.day0.tempRange.innerHTML =
        processedWeatherData.current.tempRangeF;
      domCache.day0.feelsLike.innerHTML =
        processedWeatherData.current.feelsLikeF;

      // update forecast temps
      domCache.day1.tempRange.innerHTML = processedWeatherData.day1.tempRangeF;
      domCache.day2.tempRange.innerHTML = processedWeatherData.day2.tempRangeF;
      domCache.day3.tempRange.innerHTML = processedWeatherData.day3.tempRangeF;
      domCache.day4.tempRange.innerHTML = processedWeatherData.day4.tempRangeF;
      domCache.day5.tempRange.innerHTML = processedWeatherData.day5.tempRangeF;
      domCache.day6.tempRange.innerHTML = processedWeatherData.day6.tempRangeF;
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

    // render current conditions
    domCache.day0.conditions.innerHTML =
      processedWeatherData.current.conditions;
    domCache.day0.windSpeed.innerHTML = processedWeatherData.current.windSpeed;
    domCache.day0.windDirection.innerHTML =
      processedWeatherData.current.windDirection;
    domCache.day0.humidity.innerHTML = processedWeatherData.current.humidity;

    if (window.localStorage.getItem("tempScale") === "F") {
      domCache.day0.temperature.innerHTML = processedWeatherData.current.tempF;
      domCache.day0.feelsLike.innerHTML =
        processedWeatherData.current.feelsLikeF;
    } else {
      domCache.day0.temperature.innerHTML = processedWeatherData.current.tempC;
      domCache.day0.feelsLike.innerHTML =
        processedWeatherData.current.feelsLikeC;
    }
  };
  const renderForecastData = (processedWeatherData) => {
    // render forecast day names
    const dayNames = getLocalDays();
    const dayNameElements = [
      domCache.day0,
      domCache.day1,
      domCache.day2,
      domCache.day3,
      domCache.day4,
      domCache.day5,
      domCache.day6,
    ];
    const processedWeatherDataObjects = [
      processedWeatherData.current,
      processedWeatherData.day1,
      processedWeatherData.day2,
      processedWeatherData.day3,
      processedWeatherData.day4,
      processedWeatherData.day5,
      processedWeatherData.day6,
    ];

    for (let i = 0; i < dayNames.length; i++) {
      dayNameElements[i].dayName.innerHTML = dayNames[i];
    }
    if (window.localStorage.getItem("tempScale") === "F") {
      // render farenheight temp range data
      for (let i = 0; i < dayNameElements.length; i++) {
        dayNameElements[i].tempRange.innerHTML =
          processedWeatherDataObjects[i].tempRangeF;
      }
    } else {
      // render celsius temp range data
      for (let i = 0; i < dayNameElements.length; i++) {
        dayNameElements[i].tempRange.innerHTML =
          processedWeatherDataObjects[i].tempRangeC;
      }
    }
  };

  return { createHandlerFunctions, renderWeatherData, renderForecastData };
})();
