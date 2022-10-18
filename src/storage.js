import { renderWeatherData } from "./render";
import { processWeatherData } from "./processData";

// getData() - calls API and retrieves object

export const getWeatherData = (loc = "shanghai") => {
  // ^^ placeholder for function that will retrieve location from input field
  // const location = getLocation()
  const apiKey = "375ca8e8e974816fe616fd7e2566782a";

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${loc}&APPID=${apiKey}`;

  const retrieveWeatherData = new Promise((resolve, reject) => {
    const retrievedData = fetch(url, { mode: "cors" });
    if (retrievedData) {
      resolve(retrievedData);
      // returns the retrieved data as a promise
    } else reject("bad data");
    //  returns the string "bad data"
  });

  retrieveWeatherData
    .then((retrievedData) => {
      return retrievedData.json();
      // converts the retrieved JSON data to an enumerable object (similar to parse())
    })
    .then((retrievedData) => {
      const processedWeatherData = processWeatherData(retrievedData);
      return processedWeatherData;
    })
    .then((processedWeatherData) => {
      renderWeatherData(processedWeatherData);
    })
    .catch((error) => {
      console.log(error);
    });
};
