import { domCache } from "./render.js";
import { callAPI } from "./storage.js";
import { getLocalDays } from "./processData";
import cloudyIcon from "./images/cloudyIcon-24w.png";
import hazyIcon from "./images/hazyIcon-24w.png";
import rainyIcon from "./images/rainyIcon-24w.png";
import snowyIcon from "./images/snowyIcon-24w.png";
import sunnyIcon from "./images/sunnyIcon-24w.png";

export const modifyDOM = (() => {
  // IN TESTING

  const toggleTempScaleTest = () => {
    console.log("hi");
  };

  // ^^ IN TESTING
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
    // IN TESTING
    domCache.toggleTempScale.addEventListener("click", toggleTempScaleTest);
    // ^^ IN TESTING
    // domCache.toggleTempScale.addEventListener("click", toggleTempScale);  // COMMENTED OUT FOR TESTING
    domCache.changeLocation.addEventListener("click", showInputField);
    domCache.submitLocation.addEventListener("click", hideInputField);
    domCache.submitLocation.addEventListener("click", callAPI.getWeatherData);
  };

  const renderWeatherData = (data) => {
    domCache.location.innerHTML = JSON.parse(
      window.localStorage.getItem("location")
    );
    domCache.day0.conditions.innerHTML = data.conditions;
    domCache.day0.windSpeed.innerHTML = data.windSpeed;
    domCache.day0.windDirection.innerHTML = data.windDirection;
    domCache.day0.humidity.innerHTML = data.humidity;

    if (window.localStorage.getItem("tempScale") === "F") {
      domCache.day0.temperature.innerHTML = data.tempF;
      domCache.day0.feelsLike.innerHTML = data.feelsLikeF;
    } else {
      domCache.day0.temperature.innerHTML = data.tempC;
      domCache.day0.feelsLike.innerHTML = data.feelsLikeC;
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
