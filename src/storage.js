import { modifyDOM, domCache } from "./render";
import { getCoordinates, processWeatherData } from "./processData";

// SETS INITIAL LOCAL STORAGE VALUES IF ABSENT
(() => {
  if (!localStorage.getItem("tempScale")) {
    localStorage.setItem("tempScale", "F");
  }
})();

export const callAPI = (() => {
  const createPromise = (loc = "seattle") => {
    const requestCoordinates = new Promise((resolve, reject) => {
      const apiKey = "375ca8e8e974816fe616fd7e2566782a";
      // use stored location as default if it exists
      if (window.localStorage.getItem("location")) {
        loc = JSON.parse(window.localStorage.getItem("location"));
      }
      // use inputted location if input is not empty
      if (domCache.locationInput.value !== "") {
        loc = domCache.locationInput.value;
      }

      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${loc}&appid=${apiKey}`;
      const retrievedData = fetch(url, { mode: "cors" });
      if (retrievedData) {
        resolve(retrievedData);
        // return the retrieved data as a promise
      } else reject("bad data");
      //  return the string "bad data"
    });
    return requestCoordinates;
  };

  const createForecastPromise = (coordinates) => {
    const requestForecast = new Promise((resolve, reject) => {
      const apiKey = "375ca8e8e974816fe616fd7e2566782a";
      const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.latitude}&lon=${coordinates.longitude}&exclude=minutely,hourly,alerts&appid=${apiKey}`;
      const retrievedData = fetch(url, { mode: "cors" });
      if (retrievedData) {
        resolve(retrievedData);
      } else reject("bad data");
    });
    return requestForecast;
  };

  const getWeatherData = () => {
    const requestCoordinates = createPromise();
    requestCoordinates
      .then((retrievedData) => {
        const retrievedDataObject = retrievedData.json();
        return retrievedDataObject;
        // convert the retrieved JSON data to an enumerable object, save location to local storage so it can be displayed later
      })
      .then((retrievedDataObject) => {
        const coordinates = getCoordinates(retrievedDataObject);
        window.localStorage.setItem(
          "location",
          JSON.stringify(coordinates.location)
        );
        return coordinates;
        // extract coordinates and save in an object
      })
      .then((coordinates) => {
        const requestForecast = createForecastPromise(coordinates);
        requestForecast
          .then((retrievedData) => {
            const retrievedDataObject = retrievedData.json();
            return retrievedDataObject;
            // convert the retrieved JSON data to an enumerable object)
          })
          .then((retrievedDataObject) => {
            const processedWeatherData =
              processWeatherData(retrievedDataObject);
            return processedWeatherData;
            // extract relevant info and save in an object
          })
          .then((processedWeatherData) => {
            window.localStorage.setItem(
              "currentWeatherData",
              JSON.stringify(processedWeatherData)
            );
            // save processed data to local storage
            return processedWeatherData;
          })
          .then((processedWeatherData) => {
            modifyDOM.renderWeatherData(processedWeatherData);
            return processedWeatherData;
            // update the DOM with properties from that object
          });
      })

      .catch((error) => {
        console.log(error);
      });
  };

  return { getWeatherData };
})();
