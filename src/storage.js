import { renderWeatherData } from "./render";
import { processWeatherData } from "./processData";

// SETS INITIAL LOCAL STORAGE VALUES IF ABSENT
(() => {
  if (!localStorage.getItem("tempScale")) {
    localStorage.setItem("tempScale", "F");
  }
})();

const createPromise = () => {
  const requestWeatherData = new Promise((resolve, reject) => {
    const loc = "washington dc";
    // ^^default is a placeholder for function that will retrieve location from input field
    // const loc = getLocation()
    const apiKey = "375ca8e8e974816fe616fd7e2566782a";

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${loc}&APPID=${apiKey}`;
    const retrievedData = fetch(url, { mode: "cors" });
    if (retrievedData) {
      resolve(retrievedData);
      // return the retrieved data as a promise
    } else reject("bad data");
    //  return the string "bad data"
  });
  return requestWeatherData;
};

export const getWeatherData = () => {
  const requestWeatherData = createPromise();
  requestWeatherData
    .then((retrievedData) => {
      const retrievedDataObject = retrievedData.json();
      return retrievedDataObject;
      // convert the retrieved JSON data to an enumerable object)
    })
    .then((retrievedDataObject) => {
      const processedWeatherData = processWeatherData(retrievedDataObject);
      return processedWeatherData;
      // extract useful info and save in an object
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
      renderWeatherData(processedWeatherData);
      return processedWeatherData;
      // update the DOM with properties from that object
    })
    .catch((error) => {
      console.log(error);
    });
};
